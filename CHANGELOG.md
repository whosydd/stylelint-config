# Change Log

All notable changes to the "stylelint-config" extension will be documented in this file.

## [1.3.0]

- add pnpm
- 添加配置项：现在需要在`settings`中配置默认包管理工具（首次使用会弹出选项框）

## [1.2.0]

- 添加功能：工作区如果存在多个文件夹，提示可选文件夹

## [1.1.2]

- updated README

## [1.1.1]

- 优化体验
- fixed bug

## [1.1.0]

- 优化体验
  - 由于使用`WGET`时，如果修改文件会导致地址发生改变，需要重新配置；所以该版本直接通过发送`GET`请求的方式获取配置文件，只需配置一次即可，可以随意编辑配置文件

## [1.0.0]

- 添加配置项
  - 配置 gist 地址后，将通过 wget 直接从 gist 下载配置文件
  - 可以通过配置`stylelint-config.tip`选择是否显示`install dependencies` 的提示

## [0.2.3]

- 更换图床

## [0.2.2]

- 优化体验

## [0.2.1]

- 添加对 stylelint 的扩展依赖

## [0.2.0]

- 添加功能-生成配置文件后可选自动安装依赖包

## [0.1.3]

- 更新 vscode 版本支持为 1.57.0 以上

## [0.1.2]

- 优化代码

## [0.1.1]

- 移除无用配置项

## [0.1.0]

- Initial release
