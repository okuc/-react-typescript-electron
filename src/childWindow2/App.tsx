import React, { useState, Fragment } from "react";

import { ipcRenderer, remote, ipcMain } from "electron";
type MyProps = {
  // using `interface` is also ok
  message?: string;
};
type MyState = {
  msg: string; // like this
};
class App extends React.Component<MyProps,MyState>{
  state: MyState = {
    // optional second annotation for better type inference
    msg: "",
  };
  sendMsg = () => {
    ipcRenderer.send('paradata2', { "msg": "我是childWindow2，我收到你的消息了！" });
  };
  messageBind = (e:MessageEvent)=>{
    console.log(e.data);   
    console.log(e.source);//页面来源，也是发送消息时用到的第二个参数，本地为file://,网址中的页面为http://www.xx.com，发送消息是用*或不写，可发送到全部
     
    this.setState({msg:e.data.msg});
  }
  componentDidMount() {
    window.addEventListener('message', this.messageBind)
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.messageBind)
  }
  
  render() {
  return (
      <Fragment>
      <div>我是一个win.open打开的子窗口,接收到的参数:{this.state.msg}</div>
      
      <button onClick={this.sendMsg}>给父窗口传值</button>
      </Fragment>
  )}
}
export default App;