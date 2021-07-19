const vscode = require('vscode')
const fs = require('fs')
const axios = require('axios')
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  // 通知
  vscode.window.showInformationMessage('StylelintConfig for VS Code 1.1.0 NEW!', {
    modal: true,
    detail: `由于改用ajax请求的方式获取gist上的配置文件，现在配置项需要gist_id，请参考扩展详情页！
    
    Please refer to the extension details page!`,
  })

  let stylelint = vscode.commands.registerCommand('stylelint-config', async function (folder) {
    // 获取配置项
    const flag = await vscode.workspace.getConfiguration('stylelint-config').get('tip')
    const res = await vscode.workspace.getConfiguration('stylelint-config').get('gist')
    const { configID, ignoreID } = res

    // 获取工作区路径
    let workspace
    if (!folder) workspace = vscode.workspace.workspaceFolders[0].uri.fsPath
    else workspace = folder.fsPath

    // default
    const defaultConfigFile = fs.readFileSync(`${__dirname}/src/.stylelintrc.js`, 'utf-8')
    const defaultIgnoreFile = fs.readFileSync(`${__dirname}/src/.stylelintignore`, 'utf-8')

    // handle
    function copyHandle() {
      // 判断配置项
      if (configID) {
        axios
          .get('https://api.github.com/gists/' + configID)
          .then(res => {
            const configFile = res.data.files['.stylelintrc.js'].content
            fs.writeFileSync(`${workspace}/.stylelintrc.js`, configFile)
            tip()
          })
          .catch(err => {
            vscode.window.showErrorMessage(err.message)
          })
        if (ignoreID) {
          axios
            .get('https://api.github.com/gists/' + ignoreID)
            .then(res => {
              const ignoreFile = res.data.files['.stylelintignore'].content
              fs.writeFileSync(`${workspace}/.stylelintignore`, ignoreFile)
              tip()
            })
            .catch(err => {
              vscode.window.showErrorMessage(err.message)
            })
        }
      } else {
        fs.writeFileSync(`${workspace}/.stylelintrc.js`, defaultConfigFile)
        fs.writeFileSync(`${workspace}/.stylelintignore`, defaultIgnoreFile)
        tip()
      }
    }

    // tip
    function tip() {
      if (!flag) return
      vscode.window
        .showInformationMessage('Do you need to install stylelint?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') {
            const terminal = vscode.window.createTerminal({
              name: 'stylelint',
            })
            terminal.show()
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
        })
    }

    // 判断工作区是否存在配置文件
    if (
      !fs.existsSync(
        `${workspace}/.stylelintrc.js` ||
          `${workspace}/.stylelintrc` ||
          `${workspace}/.stylelintrc.json`
      )
    )
      copyHandle()
    else
      vscode.window
        .showWarningMessage(
          'An .stylelintrc file already exists in this workspace.',
          'Replace',
          'OK'
        )
        .then(value => {
          value === 'Replace' ? copyHandle() : null
        })
  })

  context.subscriptions.push(stylelint)
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
