import React, { useState } from "react";
import { Slider } from "antd";

import { remote, BrowserWindow, MenuItem } from "electron";
import { Row, Col } from "antd";
interface WindowState {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

const initialState: WindowState = {
  width: 800,
  height: 600,
  x: 50,
  y: 50,
};

const MyWindow = () => {
  const addMenu = () => {
      const menu= new remote.Menu();
      var menuItemOpen:MenuItem = new remote.MenuItem({label:'打开'});
      var menuItemSave:MenuItem = new remote.MenuItem({label:'保存',click:()=>{alert(123)}});
      var menuItemNewMenu = new remote.MenuItem({label:'动态菜单',submenu:[]});
      menuItemNewMenu.submenu?.append(menuItemOpen);
      menuItemNewMenu.submenu?.append(menuItemSave);
      menu.append(menuItemNewMenu);
      menu.append(menuItemNewMenu);
     // remote.Menu.setApplicationMenu(menu);//清空原来的菜单，只保留新加的菜单
      const oldMenu:Electron.Menu|null = remote.Menu.getApplicationMenu();
      oldMenu?.append(menuItemNewMenu);
      remote.Menu.setApplicationMenu(oldMenu);
    };
    const getWindow = () => {
        setWindowState(win.getBounds());
      };
      const setWindow = () => {//设置窗口大小和位置的两种方式
        win.setBounds({width:100,height:100,x:100,y:100});
        //win.setSize(100,100);
       // win.setPosition(100,100);
      };
      const setWindowFullScreen = () => {//设置窗口全屏
        win.setFullScreen(win.isFullScreen()?false:true);
      };
      const setWindowKiosk = () => {
          //设置窗口锁定模式，另一种全屏，通俗的说就是全屏（不同于F１１全屏），
          //是啥都没有的全屏，无地址栏，无ｗｉｎｄｏｗｓ状态栏等等，就是一裸的ｗｅｂ页面和滚动条。
        win.setKiosk(win.isKiosk()?false:true);
      };
        
  //设置长宽，xy的stat
  const [windowState, setWindowState] = useState(initialState);
  const win = remote.getCurrentWindow();

  return (
    <div>
      <Row>
        <Col span={4} >
          {windowState.width}
        </Col>
        <Col span={20}>
          <Slider value={windowState.width} max={2000} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          {windowState.height}
        </Col>
        <Col span={20}>
          <Slider value={windowState.height} max={2000} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          {windowState.x}
        </Col>
        <Col span={20} >
          <Slider value={windowState.x} max={2000} />
        </Col>
      </Row>
      <Row>
        <Col span={4} >
          {windowState.y}
        </Col>
        <Col span={20} >
          <Slider value={windowState.y} max={2000} />
        </Col>
      </Row>
      <button onClick={getWindow}>获取窗口大小和位置</button>
      <button onClick={setWindow}>设置窗口大小和位置</button>
      <button onClick={setWindowFullScreen}>设置/恢复窗口全屏</button>
      <button onClick={setWindowKiosk}>设置窗口锁定模式</button>
      <button onClick={addMenu}>动态添加菜单</button>
    </div>
  );
};

export default MyWindow;
