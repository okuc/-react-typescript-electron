
import React from 'react';

import { Tabs } from 'antd';
import SelectFile from './compments/SelectFile';
import App from './compments/App';
import Window  from './compments/MyWindow'
import ZoomPage  from './compments/ZoomPage'
import PreImg  from './compments/PreImg'


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
    <TabPane tab="父子窗口" key="2">
      <App/>
    </TabPane>
    <TabPane tab="窗口大小和位置" key="3">
      <Window></Window>
    </TabPane>
    <TabPane tab="放大缩小页面" key="4">
      <ZoomPage></ZoomPage>
    </TabPane>
    <TabPane tab="图像相关" key="5">
      <PreImg></PreImg>
    </TabPane>
  </Tabs>
);
}

export default MyTabs;