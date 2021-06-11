# StylelintConfig for VS Code

## Prerequisites

```bash
# local
npm i -D stylelint stylelint-config-standard stylelint-config-recess-order stylelint-config-prettier

# global
npm i -g stylelint stylelint-config-standard stylelint-config-recess-order stylelint-config-prettier
```

> If you use `npm i -g` to install, **maybe** you need set `stylelint.configBasedir` in `settings.json`
>
> ![configBasedir](https://i.loli.net/2021/06/11/QydSMZ57vnxmiRa.png)

## Usage

使用资源管理器右键菜单中的 `Generate .stylelintrc` 命令可以在工作区根目录生成 `.stylelintrc.js` 和 `.stylelintignore`



A new `.stylelintrc.js` file and a new `.stylelintignore` file can be created via the Explorer sidebar's context menu by right-clicking in the folder where you'd like it to be and selecting `Generate .stylelintrc`.

## Configuration

### .stylelintrc.js

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
test/
dist/
build/
```

