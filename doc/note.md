# 创建步骤
- `npx create-react-app react-typescript-electron --template typescript`:拉取最新项目模板
- `npm run eject`:还原项目原始状态
- `cnpm i electron --save-dev`、`cnpm i devtron --save-dev`：安装electron及开发工具依赖
- `npm i -D react-app-rewired cross-env`:react-app-rewired用于扩展 webpack 配置，cross-env运行跨平台设置和使用环境变量的脚本
- `npm i -D electron-builder`添加打包工具
# 打包过程： 
    1. 打包 react
        - `npm run build`
    2. react 打包完成后，可以运行 electron 生产环境查看一下功能是否正常运行
        - `npm run start-electron-prod`
    3. 打包 electron 项目为安装包，安装包会生成到指定的 build-electron 目录
        - `npm run build-electron`
        - `npm run build-electron-green`

# 引入antd
 - `npm install antd --save`
 - `npm install react-app-rewired customize-cra`，对reate-react-app 的默认配置进行自定义
 - `npm install babel-plugin-import`，babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件