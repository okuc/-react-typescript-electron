//此文件为 react-app-rewired 配置文件，扩展webpack配置
//参考文章：https://zhuanlan.zhihu.com/p/96103181
const { override, fixBabelImports ,overrideDevServer,addLessLoader} = require('customize-cra');
const addWebpackTarget = target => config => {
  config.target = target
  return config
}

const multipleEntry = require('react-app-rewire-multiple-entry')([{
    entry: 'src/childWindow/index.tsx',
    template: 'public/index.html',
    outPath: '/child.html',
}]);

const addEntry = () => config => {

    multipleEntry.addMultiEntry(config);
    return config;
};

const addEntryProxy = () => (configFunction) => {
    multipleEntry.addEntryProxy(configFunction);
    return configFunction;
}

module.exports = {
    webpack: override(
        addEntry(),
        fixBabelImports('import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
      }),    
     // addLessLoader(),
      addWebpackTarget('electron-renderer'), 
    ),
    devServer: overrideDevServer(
      //  addEntryProxy(),
    )
}

 