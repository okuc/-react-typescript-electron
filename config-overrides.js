//此文件为 react-app-rewired 配置文件，扩展webpack配置
const { override, fixBabelImports } = require('customize-cra');
const addWebpackTarget = target => config => {
  config.target = target
  return config
}

module.exports = override(
  addWebpackTarget('electron-renderer'),
   fixBabelImports('import', {
     libraryName: 'antd',
      libraryDirectory: 'es',
     style: 'css',
   }),
 );
