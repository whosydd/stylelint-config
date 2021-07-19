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

![stylelint 50](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712133752.png)

## Configuration

### Sync from gist

```json
// settings.json:
"stylelint-config.gist": {
    "configID": "6f648ed0e1ea6ca3f8daeca6df41a788",
    // 如果不想生成 .stylelintignore 文件，请不要设置 ignoreID
    // If you do not want to generate a .stylelintignore file, please do not set 'ignoreID'
    "ignoreID": "8cbac80a0344d0571f30f51a7562034c"
},
```

可以选择在[gist](https://gist.github.com/)上添加`.stylelintrc.js`以及`.stylelintignore`，将`gist_id`添加到配置项中，扩展会通过`ajax`请求获取相应配置文件

#### 获取`gist_id`:![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210719143245.PNG)

### Tip

```json
// settings.json:
"stylelint-config.tip": true //default
```

```bash
# You can choose to install dependencies manually
npm i -D stylelint stylelint-config-standard stylelint-config-recess-order stylelint-config-prettier
```

设置为`false`时，将不再提示`install dependencies`![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712125946.PNG)

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
