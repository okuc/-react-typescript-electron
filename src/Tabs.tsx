
import React from 'react';

import { Tabs } from 'antd';
import SelectFile from './SelectFile';
import App from './App';
import Window  from './MyWindow'


const { TabPane } = Tabs;

function callback(key:any) {
  console.log(key);
}
function MyTabs() {
return (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="SelectFile" key="1">
      <SelectFile></SelectFile>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      <App/>
    </TabPane>
    <TabPane tab="窗口大小和位置" key="3">
      <Window></Window>
    </TabPane>
  </Tabs>
);
}

export default MyTabs;