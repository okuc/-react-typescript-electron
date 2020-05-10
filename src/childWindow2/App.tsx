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