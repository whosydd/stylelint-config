# StylelintConfig for VS Code

## Dependencies

- stylelint
- stylelint-config-standard
- stylelint-order
- postcss-scss

## ExtensionDependencies

- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

## Usage

![](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210704000713.gif)

![stylelint 50](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712133752.png)

## Configuration

### Choose `npm`、 `yarn`、 `pnpm`

```json
// settings.json
"stylelint-config.tool": "npm" //default
```

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

#### 获取`gist_id`:

![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210719143245.PNG)

### Tip

```json
// settings.json:
"stylelint-config.tip": true //default
```

```bash
# You can choose to install dependencies manually
npm i -D stylelint stylelint-config-standard stylelint-order postcss-scss
```

设置为`false`时，将不再提示`install dependencies`![Capture](https://raw.githubusercontent.com/whosydd/images-in-one/main/20210712125946.PNG)

### Default

默认情况下，将直接从扩展的`template`目录复制以下配置文件

#### .stylelintrc.js

>  配置项参考 https://juejin.cn/post/6940127032932040735
>
> order 参考 https://github.com/primer/stylelint-config/blob/main/property-order.js
>
> 感谢作者分享！

```js
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    // 颜色指定大写
    'color-hex-case': 'upper',
    // 禁止空块
    'block-no-empty': true,
    // 颜色6位长度
    'color-hex-length': 'long',
    // 兼容自定义标签名
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [],
      },
    ],
    // 忽略伪类选择器 ::v-deep
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    'no-descending-specificity': null,
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    // 禁止空注释
    'comment-no-empty': true,
    // 禁止简写属性的冗余值
    'shorthand-property-no-redundant-values': true,
    // 禁止值的浏览器引擎前缀
    'value-no-vendor-prefix': true,
    // property-no-vendor-prefix
    'property-no-vendor-prefix': true,
    // 禁止小于 1 的小数有一个前导零
    'number-leading-zero': 'never',
    // 禁止空第一行
    'no-empty-first-line': true,
    // 属性的排序
    'order/properties-order': [
      'all',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'box-sizing',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'font-variant',
      'font-size-adjust',
      'font-stretch',
      'font-effect',
      'font-emphasize',
      'font-emphasize-position',
      'font-emphasize-style',
      'font-smooth',
      'hyphens',
      'line-height',
      'color',
      'text-align',
      'text-align-last',
      'text-emphasis',
      'text-emphasis-color',
      'text-emphasis-style',
      'text-emphasis-position',
      'text-decoration',
      'text-indent',
      'text-justify',
      'text-outline',
      'text-overflow',
      'text-overflow-ellipsis',
      'text-overflow-mode',
      'text-shadow',
      'text-transform',
      'text-wrap',
      'letter-spacing',
      'word-break',
      'word-spacing',
      'word-wrap',
      'tab-size',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-position',
      'list-style-type',
      'list-style-image',
      'pointer-events',
      'fill',
      'fill-opacity',
      'stroke',
      'stroke-opacity',
      'stroke-width',
      'shape-rendering',
      'cursor',
      'visibility',
      'zoom',
      'flex-direction',
      'flex-order',
      'flex-pack',
      'flex-align',
      'table-layout',
      'empty-cells',
      'caption-side',
      'border-spacing',
      'border-collapse',
      'content',
      'quotes',
      'counter-reset',
      'counter-increment',
      'resize',
      'user-select',
      'nav-index',
      'nav-up',
      'nav-right',
      'nav-down',
      'nav-left',
      'background',
      'background-color',
      'background-image',
      'filter',
      'background-repeat',
      'background-attachment',
      'background-position',
      'background-position-x',
      'background-position-y',
      'background-clip',
      'background-origin',
      'background-size',
      'border',
      'border-color',
      'border-style',
      'border-width',
      'border-top',
      'border-top-color',
      'border-top-style',
      'border-top-width',
      'border-right',
      'border-right-color',
      'border-right-style',
      'border-right-width',
      'border-bottom',
      'border-bottom-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-left',
      'border-left-color',
      'border-left-style',
      'border-left-width',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-image',
      'border-image-source',
      'border-image-slice',
      'border-image-width',
      'border-image-outset',
      'border-image-repeat',
      'outline',
      'outline-width',
      'outline-style',
      'outline-color',
      'outline-offset',
      'box-shadow',
      'opacity',
      'transition',
      'transition-delay',
      'transition-timing-function',
      'transition-duration',
      'transition-property',
      'transform',
      'transform-origin',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-fill-mode',
      'animation-play-state',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
    ],
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
