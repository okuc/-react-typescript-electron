import React,{useState} from "react";
import logo from "./logo.svg";
import "./App.css";

import path from "path";
import { ipcRenderer, remote } from "electron";
function App() {
  const closeWindow = () => {
    window.close();
  };
  const minWindow = () => {
    ipcRenderer.send("min");
  };
      //接收另一个窗口传过来的值（此消息经过ipcman主线程中转才可以）
 ipcRenderer.on('paradata', (event, arg) => {
        console.log(arg);
        setMsg(arg.msg);
      })

      
  const openWindow = () => {
    //添加子窗口，不添加parent参数则为两个并列的窗口，没有父子关系
    const win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 400,
      height: 275,
      modal: true,//设定为模式窗口，父窗口不可再用。
      webPreferences: {
        nodeIntegration: true,
        //preload: path.join(__dirname, "preload.js"),
      },
    });

    win.on("close", function () {

    });

    //加载页面
    const startUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/child.html"
        : path.join(__dirname, "/build/child.html");
    win.loadURL(startUrl);

    win.webContents.on('did-finish-load', () => {//加载完毕,向子窗口发送信息
      win.webContents.send('data',{name:"张三",age:24})
    })
    win.show();
  };
let childWin:Window | null ;
  const openWindow2 = () => {
    //加载页面
    const startUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/child.html"
        : path.join(__dirname, "/build/child.html");
        childWin = window.open(startUrl,"title","width=300,height=200");//也可以直接是网址。
   
  };

  const getFocus = ()=>{
    if(childWin!=undefined){
      childWin.focus();
    }
  }

  const getBlur = ()=>{
    if(childWin!=undefined){
      childWin.blur ();
    }
  }  
  const getClose = ()=>{
    if(childWin!=undefined){
      if(childWin.closed){
        alert("窗口已关闭，无需再次关闭");
        return;
      }
      childWin.close();
    }
  }
  const printWindow = ()=>{
    if(childWin!=undefined){
        childWin.print();
    }
  }
  const [msg, setMsg] = useState("");

  return (
    <div className="App">
      <button onClick={closeWindow}>关闭窗口</button>
      <button onClick={minWindow}>最小化窗口</button>
      <button onClick={openWindow}>打开子窗口</button>
      <button onClick={openWindow2}>打开子窗口win.open</button>
      <button onClick={getFocus}>获取焦点</button>
      <button onClick={getBlur}>失去焦点</button>
      <button onClick={getClose}>关闭窗口</button>
      <button onClick={printWindow}>打印</button>
  <div>{msg}</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
