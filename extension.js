const vscode = require('vscode')
const fs = require('fs')

const stylelintrc = `module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'unit-whitelist': ['em', 'rem', '%', 's', 'px', 'deg'],
    'block-no-empty': true,
    'at-rule-no-unknown': null,
  },
}
`

const ignore = `**/*.min.css

.vscode/
.idea/
node_modules/
test/
dist/
build/`

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('stylelint-config', async function (folder) {
    // 生成配置文件
    const workspace = folder._fsPath
    if (
      !fs.existsSync(
        `${workspace}/.stylelintrc.js` ||
          `${workspace}/.stylelintrc` ||
          `${workspace}/.stylelintrc.json`
      )
    ) {
      fs.writeFileSync(`${workspace}/.stylelintrc.js`, stylelintrc)
      fs.writeFileSync(`${workspace}/.stylelintignore`, ignore)
    } else {
      vscode.window.showErrorMessage('An .stylelintrc file already exists in this workspace.')
    }
  })

  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
