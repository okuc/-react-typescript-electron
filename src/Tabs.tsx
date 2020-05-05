
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
    <TabPane tab="SelectFile" key="1">
      <SelectFile></SelectFile>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      <App/>
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);
}

export default MyTabs;