# 创建步骤
- `npx create-react-app react-typescript-electron --template typescript`:拉取最新项目模板
- `npm run eject`:还原项目原始状态
- `cnpm i electron --save-dev`、`cnpm i devtron --save-dev`：安装electron及开发工具依赖
- `npm i -D react-app-rewired cross-env`:react-app-rewired用于扩展 webpack 配置，cross-env运行跨平台设置和使用环境变量的脚本