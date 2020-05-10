import React, { useState } from "react";

import { remote, webFrame } from "electron";

const ZoomPage = () => {
  //webFrame是当前browserWindowr实例，可以对当前页面进行放大缩小、插入文本、css、获取页面的框架结构等操作
  const zoomOut = () => {
      webFrame.setZoomLevel(webFrame.getZoomLevel()+1);
    };
    const zoomIn = () => {
        webFrame.setZoomLevel(webFrame.getZoomLevel()-1);
      };
      const maxScreen = () => {
            //获得屏幕的高度和宽度
          const {width,height} = remote.screen.getPrimaryDisplay().workAreaSize;

          remote.getCurrentWindow().setSize(width,height);
          remote.getCurrentWindow().setPosition(0,0);
        };
        const getInfo = () => {
              //获得屏幕的高度和宽度
            const {width,height} = remote.screen.getPrimaryDisplay().workAreaSize;
            setScreen(()=>({width:width,height:height}));
            //获取鼠标位置
            const point = remote.screen.getCursorScreenPoint();
            setCursor(()=>({x:point.x,y:point.y}));
          };
        const [screen, setScreen] = useState({width:0,height:0});//保存屏幕的长和宽
        const [cursor, setCursor] = useState({x:0,y:0});//保存鼠标位置

  return (
    <div>
      <div>这里是页面内容</div>
      <button onClick={zoomOut}>放大页面</button>
      <button onClick={zoomIn}>缩小页面</button>
      <button onClick={maxScreen}>窗口占满整个屏幕</button>
      <button onClick={getInfo}>获取屏幕分辨率及鼠标位置</button>
  <div>屏幕分辨率：{screen.width}--{screen.height}</div>
  <div>鼠标位置：{cursor.x}-----{cursor.y}</div>
   </div>
  );
};

export default ZoomPage;
