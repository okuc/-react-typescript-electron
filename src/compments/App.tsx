import React, { useState, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Input, Select } from "antd";
import path from "path";
import { ipcRenderer, remote, BrowserWindow } from "electron";
import pathHelper,{urlNoFile} from "./PathHelper";
function App() {
  const [msg, setMsg] = useState<string | null>("123");
  const [childWin, setChildWin] = useState<Window | null>(null); //将子窗口引入放入状态中，防止刷新页面时丢失引用

  const closeWindow = () => {
    window.close();
  };
  const minWindow = () => {
    ipcRenderer.send("min");
  };
  //接收另一个窗口传过来的值（此消息经过ipcman主线程中转才可以）
  ipcRenderer.on("paradata", (event, arg) => {
    console.log(arg);
    setMsg(arg.msg);
  });

  const openWindow = () => {
    //开发环境下

    //设置窗口菜单https://www.electronjs.org/docs/api/menu-item#menuitemmenu
    let img = path.join(urlNoFile, "icon.png");

    if (process.env.NODE_ENV === "development") {
      img = "./public/icon.png";
    } else {
      img = path.join(urlNoFile, "icon.png");
    }

    //添加子窗口，不添加parent参数则为两个并列的窗口，没有父子关系
    const win = new remote.BrowserWindow({
      parent: remote.getCurrentWindow(),
      width: 400,
      height: 275,
      icon: img,
      modal: true, //设定为模式窗口，父窗口不可再用。
      frame: true, //是否有标题、菜单
      webPreferences: {
        nodeIntegration: true,
        //preload: path.join(__dirname, "preload.js"),
      },
    });

    win.on("close", function () {});
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: "文件",
        submenu: [
          {
            label: "关于",
            icon: remote.nativeImage.createFromPath(img),//不支持file开头的路径
            click: () => {
              var aboutWin = new remote.BrowserWindow({
                width: 300,
                height: 200,
                parent: win,
                modal: true,
                frame: false, //是否有标题、菜单
              });
              aboutWin.loadURL("http://www.baidu.com");
            },
          },
          { type: "separator" },
          { label: "关闭", accelerator: "", click: () => win.close() },
        ],
      },
      {
        label: "多选及单选菜单",
        submenu: [
          {
            label: "多选1",
            type: "checkbox",
          },
          {
            label: "多选2",
            type: "checkbox",
          },
          {
            label: "多选3",
            type: "checkbox",
          },
          { type: "separator" },
          {
            label: "单选1",
            type: "radio",
          },
          {
            label: "单选2",
            type: "radio",
          },
          {
            label: "单选3",
            type: "radio",
          },
        ],
      },
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { type: "separator" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          { role: "pasteAndMatchStyle" },
          { role: "delete" },
          { role: "selectAll" },
        ],
      },
      {
        label: "View",
        submenu: [
          { role: "reload" },
          { role: "forceReload" },
          { role: "toggleDevTools" },
          { type: "separator" },
          { role: "resetZoom" },
          { role: "zoomIn" },
          { role: "zoomOut" },
          { type: "separator" },
          { role: "togglefullscreen" },
        ],
      },
      { role: "window", submenu: [{ role: "minimize" }, { role: "close" }] },
      {
        role: "help",
        submenu: [
          {
            label: "Learn More",
            click() {
              require("electron").shell.openExternal(
                "https://electron.atom.io"
              );
            },
          },
        ],
      },
    ];

    const menu = remote.Menu.buildFromTemplate(template);
    win.setMenu(menu); //仅仅在此窗口有效，不影响其他窗口
    //remote.Menu.setApplicationMenu(menu);//这种设置方式会使应用的所有窗口都改动
    //加载页面
    const startUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/child.html"
        : path.join(pathHelper, "/child.html");
    console.log(startUrl);
    win.loadURL(startUrl);

    win.webContents.on("did-finish-load", () => {
      //加载完毕,向子窗口发送信息
      win.webContents.send("data", { name: "张三", age: 24 });
    });
    win.show();
  };

  //////////////////////////////另外一种打开窗口的方式。
  const openWindow2 = () => {
    //加载页面

    let childWinTemp: Window | null;
    const startUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/child2.html"
        : path.join(pathHelper, "/child2.html");
    childWinTemp = window.open(startUrl, "title", "width=300,height=200"); //也可以直接是网址。
    if (childWin?.onload) {
      //这里使用了类型保护机制，只有为Window类型时才执行，为null时不执行
      const childWIn2: Window = childWin;
      childWIn2.onload = function (e) {
        childWIn2.postMessage(
          msg,
          "chrome-extension://" + window.location.host
        );
      };
    }

    setChildWin(childWinTemp);
  };
  //常用操作
  const getFocus = () => {
    if (childWin != undefined) {
      childWin.focus();
    }
  };

  const getBlur = () => {
    if (childWin != undefined) {
      childWin.blur();
    }
  };
  const getClose = () => {
    if (childWin != undefined) {
      if (childWin.closed) {
        alert("窗口已关闭，无需再次关闭");
        return;
      }
      childWin.close();
    }
  };
  const printWindow = () => {
    if (childWin != undefined) {
      childWin.print();
    }
  };

  const changeMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };
  //向子窗口传递数据
  const sendMsg = () => {
    console.log({ msg });
    console.log({ childWin });
    if (childWin != undefined) {
      childWin.postMessage({ msg }, "*");
    }
  };
  //接收子窗口传回的数据
  remote.ipcMain.on("paradata2", (event, arg) => {
    setMsg(arg.msg);
  });

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
      <button onClick={sendMsg}>win.open传参</button>
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore="向子窗口传递的数据"
          addonAfter="后辍"
          defaultValue="这里是输入的数据"
          onChange={changeMsg}
        />
      </div>
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
