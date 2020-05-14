# 创建步骤
- `npx create-react-app react-typescript-electron --template typescript`:拉取最新项目模板
- `npm run eject`:还原项目原始状态
- `cnpm i electron --save-dev`、`cnpm i devtron --save-dev`：安装electron及开发工具依赖
- `npm i -D react-app-rewired cross-env`:react-app-rewired用于扩展 webpack 配置，cross-env运行跨平台设置和使用环境变量的脚本
- `npm i -D electron-builder`添加打包工具
- `npm install react-app-rewire-multiple-entry --save-dev`支持多页面
- `npm install --save @types/react-document-title react-document-title`动态设置页面的title
- `npm install react-electron-contextmenu --save`更方便添加右键菜单
# 打包过程： 
    1. 打包 react
        - `npm run build`
    2. react 打包完成后，可以运行 electron 生产环境查看一下功能是否正常运行
        - `npm run start-electron-prod`
    3. 打包 electron 项目为安装包，安装包会生成到指定的 build-electron 目录
        - `npm run build-electron`
        - `npm run build-electron-green`

# 
    1. 安装`npm install -g electron-packager`
    2. 简单打包`electron-packager . --electron-version=8.2.5`//点是要打包的目录
    2. 简单打包`electron-packager . --executable-name=newName --electron-version=8.2.5 `//指定打包的目录
    2. 简单打包`electron-packager . --icon=xxx.ico --electron-version=8.2.5 `//指定打包的目录
    2. 简单打包`electron-packager . me --asar --electron-version=8.2.5 `//执行后，app.asar文件会替代app目录,`asar extract app.asar xyz`可以解压asar
    6. `electron-packager-interactive`向导式打包工具
## 资源处理的几中方法
    - 少什么拷什么，直接找到打包后的资源目录拷过去。拷到其他目录，也可以手动修改引用的路径。
    - 将资源目录拷贝到当前目录下。和初始路径一个目录
    - 尽可能使用Web资源(https/http)

# 引入antd
 - `npm install antd --save`
 - `npm install react-app-rewired customize-cra`，对reate-react-app 的默认配置进行自定义
 - `npm install babel-plugin-import`，babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件

 # 数据存储
 - 前端存储
     - 键值存储(key-value)
         - localStorage、IndexedDB
         - PouchDB:客户端库    
 - 安装sqlite的js版本：`npm install sql.js `,由于未能找到针对typescript的声明文件，所以最终使用`npm install sqlite3 @types/sqlite3 --save`