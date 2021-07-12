const vscode = require('vscode')
const fs = require('fs')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let stylelint = vscode.commands.registerCommand('stylelint-config', async function (folder) {
    // 获取配置项
    const flag = await vscode.workspace.getConfiguration('stylelint-config').get('tip')
    const res = await vscode.workspace.getConfiguration('stylelint-config').get('gist')
    const { configUrl, ignoreUrl } = res

    // 获取工作区路径
    const workspace = folder.fsPath

    // 复制源文件
    function copyHandle() {
      fs.writeFileSync(
        `${workspace}/.stylelintrc.js`,
        fs.readFileSync(`${__dirname}/src/.stylelintrc.js`, 'utf-8')
      )
      fs.writeFileSync(
        `${workspace}/.stylelintignore`,
        fs.readFileSync(`${__dirname}/src/.stylelintignore`, 'utf-8')
      )
      if (!flag) return
      vscode.window
        .showInformationMessage('Do you need to install dependencies?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') {
            const terminal = vscode.window.createTerminal({
              name: 'stylelint',
              // hideFromUser: true,
            })
            terminal.show()
            tip(terminal)
          }
        })
    }
    // 从gist动态获取
    function wgetHandle(configUrl, ignoreUrl) {
      const terminal = vscode.window.createTerminal({
        name: 'stylelint gist',
      })
      terminal.show()
      try {
        if (ignoreUrl) terminal.sendText(`wget ${ignoreUrl} -O .stylelintignore`)
        terminal.sendText(`wget ${configUrl} -O .stylelintrc.js`)
      } catch (error) {
        vscode.window.showWarningMessage(error)
      }
      if (!flag) return
      vscode.window
        .showInformationMessage('Do you need to install dependencies?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') tip(terminal)
        })
    }

    // 安装依赖
    function tip(terminal) {
      try {
        terminal.sendText(
          `npm i -D stylelint stylelint-config-standard stylelint-config-recess-order stylelint-config-prettier`
        )
      } catch (err) {
        vscode.window.showErrorMessage(
          `请手动安装依赖！"npm i -D stylelint stylelint-config-standard stylelint-config-recess-order stylelint-config-prettier"`
        )
      }
    }

    if (
      !fs.existsSync(
        `${workspace}/.stylelintrc.js` ||
          `${workspace}/.stylelintrc` ||
          `${workspace}/.stylelintrc.json`
      )
    ) {
      // 判断配置项
      configUrl ? wgetHandle(configUrl, ignoreUrl) : copyHandle()
    } else {
      vscode.window
        .showWarningMessage(
          'An .stylelintrc file already exists in this workspace.',
          'Replace',
          'OK'
        )
        .then(value => {
          value === 'Replace' ? (configUrl ? wgetHandle(configUrl, ignoreUrl) : copyHandle()) : null
        })
    }
  })

  context.subscriptions.push(stylelint)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
