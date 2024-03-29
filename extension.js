const vscode = require('vscode')
const fs = require('fs')
const axios = require('axios')
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  //   // update
  //   function update() {
  //     // 创建和显示webview
  //     const panel = vscode.window.createWebviewPanel(
  //       'StylelintConfig',
  //       'StylelintConfig',
  //       vscode.ViewColumn.One,
  //       {}
  //     )
  //     // 设置HTML内容
  //     panel.webview.html = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>StylelintConfig for VS Code 1.1.0 NEW!</title>
  //   </head>
  //   <body>
  //     <h1>StylelintConfig for VS Code 1.1.0 NEW!</h1>
  //     <br />
  //     <h3>由于改用ajax请求的方式获取gist上的配置文件，现在配置项格式如下</h3>
  //     <h3>"configID": "88cdd14ce8d329da28fcaa94a0b5a57d"</h3>
  //     <img src="https://raw.githubusercontent.com/whosydd/images-in-one/main/20210719143245.PNG"/>
  //   </body>
  // </html>`
  //   }

  let stylelint = vscode.commands.registerCommand('stylelint-config', async function (folder) {
    // 获取配置项
    const flag = await vscode.workspace.getConfiguration('stylelint-config').get('tip')
    const res = await vscode.workspace.getConfiguration('stylelint-config').get('gist')
    const { configID, ignoreID } = res

    let tool = await vscode.workspace.getConfiguration('stylelint-config').get('tool')

    // 获取工作区路径
    let workspace
    if (folder && Object.keys(folder).length > 0) {
      // 使用菜单
      workspace = folder.fsPath
    } else {
      // 使用命令
      let rootPath = ''
      const tmp = vscode.workspace.workspaceFolders
      if (tmp === undefined) vscode.window.showErrorMessage('Please open a workspace!')
      // 如果工作区中存在的多个文件夹，显示选择框
      if (tmp.length > 1) {
        const pick = await vscode.window.showWorkspaceFolderPick()
        if (!pick) return
        rootPath = pick.uri.fsPath
      } else {
        const pick = tmp[0]
        rootPath = pick.uri.fsPath
      }
      workspace = rootPath
    }

    // default
    const defaultConfigFile = fs.readFileSync(`${__dirname}/template/.stylelintrc.js`, 'utf-8')
    const defaultIgnoreFile = fs.readFileSync(`${__dirname}/template/.stylelintignore`, 'utf-8')

    // handle
    function copyHandle() {
      // // 判断配置项
      // if (res.configUrl) {
      //   update()
      //   return
      // }
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
        .showInformationMessage('Do you need to install dependencies?', 'Install', 'Already Done')
        .then(answer => {
          if (answer === 'Install') {
            // 确定参数
            if (tool === '' || tool === undefined) {
              return
            }
            let param
            tool === 'npm' ? (param = 'i') : (param = 'add')
            let command = `${tool} ${param} -D stylelint stylelint-config-standard stylelint-order postcss-scss`

            // 安装依赖
            exec(command)
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

function exec(command) {
  try {
    const terminal = vscode.window.createTerminal({
      name: 'stylelint',
    })
    terminal.show()
    terminal.sendText(command)
  } catch (err) {
    vscode.window.showErrorMessage(
      `请手动安装依赖！stylelint stylelint-config-standard stylelint-order postcss-scss`
    )
  }
}
