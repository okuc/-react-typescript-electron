const { app, Menu, Tray, BrowserWindow } = require("electron");
const path = require("path");

const url = require("url");
let mainWindow = null;
//声明全局变量，可在渲染进程中通过remote.getGlobal('tray')进行访问。
global.tray;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance() {
  if (process.mas) return;
  app.requestSingleInstanceLock();
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
function createWindow() {
  const windowOptions = {
    width: 800,
    height: 600,
    icon: "./public/icon.ico",
    frame: true, //是否有标题、菜单
    title: "好好学习，天天向上",
    //fullscreen:true,//是否全屏
    //transparent:true,//透明窗口
    webPreferences: {
      nodeIntegration: true,
      //preload: path.join(__dirname, "preload.js"),
    },
    show: false, //默认不显示
  };
  // 创建浏览器窗口
  /**
   * width:窗口宽度
   * height:窗口高度
   * miniWidth:最小宽度
   * miniHeight：最小高度
   * maxWidth:最大宽度
   * maxiHeight：最大高度
   * x：指定窗口的横坐标
   * y:指定窗口的纵坐标
   *
   * 获取窗口尺寸
   * getSize() 返回数组，[0]width,[1]height
   * 设置窗口尺寸
   * setSize(wight,height,flag) flag:true,以动画效果改变尺寸（仅限于Mac OS X）
   *
   * 获取窗口位置
   * getPosition() 返回数组，[0]:x,[1]:y
   * 设置窗口位置
   * setSize(x),y,flag) flag:true,以动画效果改变位置（仅限于Mac OS X）
   */
  mainWindow = new BrowserWindow(windowOptions);
  // mainWindow.loadURL("http://localhost:3000/");
  // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
  /**
   * loadURL 分为两种情况
   *  1.开发环境，指向 react 的开发环境地址
   *  2.生产环境，指向 react build 后的 index.html
   */
  //加载页面
  const startUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : path.join(__dirname, "/build/index.html");
  mainWindow.loadURL(startUrl);

  //内容加载完毕，显示窗口
  mainWindow.on("ready-to-show", () => {
    //添加托盘图标，一个应用可创建多个托盘图标，按下面的方法不停的添加即可,不要使用ico图标，ico图标会导致不弹出
    tray = new Tray(path.join(__dirname, "/public/icon.png"));

    //为托盘图标添加上下文菜单
    const contextMenu = Menu.buildFromTemplate([
      { label: "复制", role: "copy" },
      { label: "粘贴", role: "paste" },
      { label: "剪切", role: "cut" },
      {
        label: "退出",
        click: () => {
          mainWindow.destroy();
        },
      }, //我们需要在这里有一个真正的退出（这里直接强制退出）
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip("这是一个托盘应用");
    tray.on("balloon-show", () => {
      console.log('消息框显示了')
    });
    tray.on("balloon-click", () => {
      console.log('消息框点击了')
    });
    //只有等窗口自然消失时，才会触发此事件
    tray.on("balloon-closed", () => {
      console.log('消息框关闭了')
    });

    //显示主窗口
    mainWindow.show();
  });

  // 并且为你的应用加载index.html
  //win.loadFile('index.html')

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  //接收渲染进程的信息
  const ipc = require("electron").ipcMain;
  ipc.on("min", function () {
    mainWindow.minimize();
  });
  ipc.on("max", function () {
    mainWindow.maximize();
  });
  ipc.on("login", function () {
    mainWindow.maximize();
  });

  //托盘消息，弹出一个气泡
  ipc.on("trayInfo", (event, arg) => {
    console.log(arg);
    tray.displayBalloon({ title: "请重试", content: "请重新启动导航台尝试",ico:path.join(__dirname, "/public/icon.png")});
    // tray.displayBalloon(JSON.parse(arg));
  });

  //通过主进程中转的窗口间的数据
  ipc.on("paradata", (event, arg) => {
    mainWindow.webContents.send("paradata", arg);
  });
  //如果是--debug 打开开发者工具，窗口最大化，
  if (debug) {
    // 打开开发者工具
    //mainWindow.webContents.openDevTools();
    require("devtron").install();
  }

  //关闭窗口时的事件，退出时先激活window-all-closed方法，再激活此方法
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
makeSingleInstance();
//app主进程的事件和方法,app.whenReady().then(createWindow)
app.on("ready", () => {
  createWindow();
});
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    //苹果平台不需要退出
    app.quit();
  }
});

//app激活时事件，这个事件只适用于苹果系统
app.on("activate", () => {
  // if (mainWindow === null) {
  //   createWindow();
  // }

  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//也可以拆分成几个文件，然后用 require 导入。
module.exports = mainWindow;
