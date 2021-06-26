# StylelintConfig for VS Code

## Dependencies

- stylelint
- stylelint-config-standard
- stylelint-config-recess-order
- stylelint-config-prettier

## ExtensionDependencies

- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

## Usage

![npm](https://i.loli.net/2021/06/26/Hua47PB6cznrCY9.gif)

A new `.stylelintrc.js` file and a new `.stylelintignore` file can be created via the Explorer sidebar's context menu by right-clicking in the folder where you'd like it to be and selecting `Generate .stylelintrc`.

## Issues

If you use `npm i -g` to install dependencies, **maybe** you need set `stylelint.configBasedir` in `settings.json`

![configBasedir](https://i.loli.net/2021/06/11/QydSMZ57vnxmiRa.png)

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
