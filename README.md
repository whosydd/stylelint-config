# StylelintConfig for VS Code

## Dependencies

- stylelint
- stylelint-config-standard
- stylelint-config-recess-order
- stylelint-config-prettier

## ExtensionDependencies

- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

## Usage

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000713.gif)

A new `.stylelintrc.js` file and a new `.stylelintignore` file can be created via the Explorer sidebar's context menu by right-clicking in the folder where you'd like it to be and selecting `Generate .stylelintrc`.

## Configuration

### Sync from gist

可以选择在[gist](https://gist.github.com/)上添加`.stylelintrc.js`以及`.stylelintignore`，然后通过`wget`下载到本地

**注意**：如果你不想生成 `.stylelintignore` 文件，请不要设置` ignoreUrl`

**Warning:** If you do not want to generate a `.stylelintignore` file, please do not set `ignoreUrl`

**获取下载地址：**

![Screenshot of StylelintConfig for VS Code](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712130147.png)

```json
// settings.json:
"stylelint-config.gist": {
    "configUrl": "https://gist.githubusercontent.com/whosydd/6f648ed0e1ea6ca3f8daeca6df41a788/raw/42b1242eb2e9a6989b98693475b28557324ed95f/.stylelintrc.js",
    // 如果不想生成 .stylelintignore 文件，请不要设置 ignoreUrl
    // If you do not want to generate a .stylelintignore file, please do not set 'ignoreUrl'
    "ignoreUrl": "https://gist.githubusercontent.com/whosydd/8cbac80a0344d0571f30f51a7562034c/raw/4dbf6844aeb30a0e175b69e8babae82ec50e2e78/.stylelintignore"
  },
```



### Tip

设置为`false`时，将不再提示`install dependencies`

![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712125946.PNG)

```json
// settings.json:
"stylelint-config.tip": true //default
```

### Default

默认情况下，将直接从扩展的`src`目录复制以下配置文件

#### .stylelintrc.js

```js
module.exports = {
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
```

### .stylelintignore

```
**/*.min.css

.vscode/
.idea/
node_modules/
dist/
build/
```

## Issues

If you use `npm i -g` to install dependencies, **maybe** you need set `stylelint.configBasedir` in `settings.json`

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000708.PNG)
