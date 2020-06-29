import React from 'react';
import logo from './logo.svg';
import { Slider, InputNumber, Row, Col } from "antd";
import './App.css';
import { ipcRenderer } from 'electron';
import { Avatar } from 'antd';
function App() {
  const closeWindow=()=>{
    window.close();
  };
  const minWindow=()=>{
      ipcRenderer.send("min");
  };

  return (
    
    <div className="App">
    <Row>
        <Col span={24}>本软件用于制作标书时,在相互参考的多份标书间，查找是否有重复的片段。
        <br></br>目前仅支持docx,如需要支持其他格式，敬请联系作者。
        <br></br>注册、技术支持、有其他软件需求，敬请联系作者。</Col>
      </Row>
      <Row justify={"center"} align={"middle"}>
          <Col span={6}><img style={{width:200,height:200}} src={"./wx.jpg"} /></Col>
          <Col span={6}><img  style={{width:200,height:300}}  src={"qq.png"} /></Col>
        </Row>

      <button onClick={closeWindow}>关闭窗口</button>
      <button onClick={minWindow}>最小化窗口</button>
    </div>
  );
}

export default App;
