
import React from 'react';

import { Tabs } from 'antd';
import SelectFile from './SelectFile';
import App from './App';
const { TabPane } = Tabs;

function callback(key:any) {
  console.log(key);
}
function MyTabs() {
return (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="word比较查重器" key="1">
      <SelectFile></SelectFile>
    </TabPane>
    <TabPane tab="关于" key="2">
      <App/>
    </TabPane>
  </Tabs>
);
}

export default MyTabs;