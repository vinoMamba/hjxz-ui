## HJ-Design

钉钉官方最近发布了一套围绕钉钉生态的 UI 组件库。但比较可惜目前只有(React 版本)[https://standard.dingtalk.com/#/]。

由于公司使用的是 Vue，于是计划写一套基于 Vue3.0 的钉钉 UI 组件库。 目标是实现和钉钉官方组件样式功能相接近的组件库。同时结合公司的业务场景进行扩展。例如添加钉钉的选人组件等。

## Setup

```bash
pnpm install
# Eslint
pnpm lint
#Eslint fix
pnpm lint:fix
# 组件打包
pnpm build:ui
# 开发阶段，dev:ui会监听组件库的变化，同步到preview中
pnpm dev:ui
# 组件调试
pnpm dev:preview
# 其他命令请查看package.json
```
开发阶段执行`pnpm dev:ui` 和 `pnpm dev:preview`

## 项目结构

```bash
├── packages # 
│   ├── ui # 组件库
│   │   ├── src # 组件源码
│   │   ├── es # 组件打包后的文件
│   │   ├── lib # 组件打包后的文件
│   ├── preview # 组件调试，可以在这里面将组件引入进行调试
├── site # 组件官网(开发中)
├── .eslintrc.js # Eslint配置 Vscode需要安装eslint插件。
├── .husky # git hook。 代码提交前会执行eslint检查。同时对 commit 信息进行检查。
```



#### 说明

组件库采用 `pnpm` + `Monorepo`的方式进行管理。组件库的代码在`packages/ui`中，组件调试的代码在`packages/preview`中。组件库的代码会被打包到`packages/ui/es`和`packages/ui/lib`中。

关于组件的开发，这里有一些约定：

1. 代码的结构请参考`packages/ui/src/Button`中的代码结构。
2. 统一采取`Tsx`的写法，Css 部分可以使用`Less`
3. 关于组件类名的命名，都已`dtd-*`的形式进行命名，例如`dtd-button`，`dtd-button-group`等。
4. 明确类型，非特殊情况下不要使用`any`类型。

## TODO 

1. 目前组件库中只有 Button,Modal,DTree 组件。大家有什么好的组件可以提出来，一起开发。
2. 组件官方文档的搭建，目前正在开发中。开发目录在`site`中。


## 打包部署

> 打包注意包的命名以及版本信息。发布需要切换到npm官方源。

```bash
pnpm build:ui

cd packages/ui

npm login

npm publish
```
