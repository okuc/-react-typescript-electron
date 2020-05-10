import React, { useState } from "react";

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
    
      <div>我是一个win.open打开的子窗口,接收到的参数:{this.state.msg}</div>
  )}
}
export default App;