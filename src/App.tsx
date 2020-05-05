import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ipcRenderer } from 'electron';
function App() {
  const closeWindow=()=>{
    window.close();
  };
  const minWindow=()=>{
      ipcRenderer.send("min");
  };

  return (
    <div className="App">
      啥也没有，关了吧。
      <button onClick={closeWindow}>关闭窗口</button>
      <button onClick={minWindow}>最小化窗口</button>
    </div>
  );
}

export default App;
