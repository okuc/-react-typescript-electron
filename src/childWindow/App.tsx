import React, { useState } from "react";

import { ipcRenderer, remote, ipcMain } from "electron";
interface WindowState {
  name?: string;
  age?: number;
}
const initialState: WindowState = {
  name: "",
  age: 0,
};
function App() {
  //接收传过来的参数
  ipcRenderer.on('data', (event, arg) => {
    console.log(arg);
    //setName(arg.name);
    //setAge(arg.age);
    setPerson(arg);
  })
  //向另一个窗口传值，需通过主进程中的ipcman中转
  const sendMsg = () => {
    ipcRenderer.send('paradata', { "msg": "我是007，我收到你的消息了！" });
  };
  const [person, setPerson] = useState(initialState);
  return (
    <div>
      <div>我是一个子窗口,接收到的参数:{person.name}--{person.age}</div>
      <button onClick={sendMsg}>给父窗口传值</button></div>
  )
}
export default App;