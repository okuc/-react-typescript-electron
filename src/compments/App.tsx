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
      <button onClick={closeWindow}>关闭窗口</button>
      <button onClick={minWindow}>最小化窗口</button>
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
