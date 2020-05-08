import React from "react";
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
  const openWindow = () => {
    //添加子窗口，不添加parent参数则为两个并列的窗口，没有父子关系
    const win = new remote.BrowserWindow({ parent:remote.getCurrentWindow(),width: 400, height: 275 ,
      webPreferences: {
        nodeIntegration: true,
        //preload: path.join(__dirname, "preload.js"),
      },});

    win.on("close", function () {
      
    });

    //加载页面
    const startUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/child.html"
        : path.join(__dirname, "/build/child.html");
    win.loadURL(startUrl);
    win.show();
  };

  return (
    <div className="App">
      <button onClick={closeWindow}>关闭窗口</button>
      <button onClick={minWindow}>最小化窗口</button>
      <button onClick={openWindow}>打开子窗口</button>
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
