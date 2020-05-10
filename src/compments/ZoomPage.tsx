import React, { useState } from "react";
import { Slider } from "antd";

import { remote, webFrame } from "electron";

const ZoomPage = () => {
  //webFrame是当前browserWindowr实例，可以对当前页面进行放大缩小、插入文本、css、获取页面的框架结构等操作
  const zoomOut = () => {
      webFrame.setZoomLevel(webFrame.getZoomLevel()+1);
    };
    const zoomIn = () => {
        webFrame.setZoomLevel(webFrame.getZoomLevel()-1);
      };
        

  return (
    <div>
      <div>这里是页面内容</div>
      <button onClick={zoomOut}>放大页面</button>
      <button onClick={zoomIn}>缩小页面</button>
   </div>
  );
};

export default ZoomPage;
