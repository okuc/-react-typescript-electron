import React from "react";
import { remote } from "electron";
import fs from "fs";
import path from "path";
import {urlNoFile} from "./PathHelper";
interface Props {}

interface State {
  txtFileData: string;
  directoryName: Array<string>;
}

export default class SelectFile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      txtFileData: "",
      directoryName: [],
    };
  }

  /**
   * 弹出文件选择框，选择 .txt 文件
   * 将选中的 .txt 内容展示到页面
   */
  public readTxtFileData = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .txt 文件",
      defaultPath: "D:\\Personal\\Desktop",
      properties: ["openFile"],
      //buttonLabel:"请选择",选择窗口按钮的名称
      filters: [
        {
          name: "txt",
          extensions: ["txt"],
        },
      ],
    });
    fs.readFile(result.filePaths[0], "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          txtFileData: data.replace(/\n|\r\n/g, "<br/>"),
        });
      }
    });
  };
  /**
   * 弹出文件选择框，选择目录
   * 将选中的 文件夹中的文件列表展示到页面
   */
  public getSelDirectory = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .txt 文件",
      defaultPath: "D:\\Personal\\Desktop",
      properties: ["openDirectory"],
      // properties: ["openFile","multiSelections"],//多选，可以同时选择文件和目录
      //buttonLabel:"请选择",选择窗口按钮的名称
    });

    let allFiles1: Array<string> = [];
    let files = fs.readdirSync(result.filePaths[0]);
    files.forEach(function (item, index) {
      allFiles1.push(item);
    });

    this.setState(() => ({ directoryName: allFiles1 }));
  };

  /**
   * 弹出文件选择框，选择多个目录和文件
   * 将选中的文件夹及文件列表展示到页面
   */
  public getSelMulDirectory = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择目录及文件",
      defaultPath: "D:\\Personal\\Desktop",
      properties: ["openFile", "multiSelections"], //多选，可以同时选择文件和目录
      //buttonLabel:"请选择",选择窗口按钮的名称
      filters: [
        {
          name: "txt",
          extensions: ["txt"],
        },
        {
          name: ".jpg",
          extensions: ["jpg"],
        },
      ],
    });

    this.setState(() => ({ directoryName: result.filePaths }));
  };

  /**
   * 保存对话框
   */
  public saveFile = async () => {
    const result = await remote.dialog.showSaveDialog({
      title: "保存文件",
      defaultPath: "D:\\Personal\\Desktop",
      nameFieldLabel: "保存位置",
      //buttonLabel:"请选择",选择窗口按钮的名称
      filters: [
        {
          name: "txt",
          extensions: ["txt"],
        },
        {
          name: ".csv",
          extensions: ["csv"],
        },
        {
          name: "*.*",
          extensions: ["*"],
        },
      ],
    });

    this.setState(() => ({
      txtFileData: result.filePath === undefined ? "" : result.filePath,
    }));
  };

  /**
   * 其他对话框
   */
  public otherDialog = async () => {
    let img = remote.nativeImage.createFromPath(
      path.relative(".", path.join(urlNoFile, "icon.png"))
    );
    if (process.env.NODE_ENV === "development") {
      img = remote.nativeImage.createFromPath("./public/icon.ico");
    } else {
      img = remote.nativeImage.createFromPath(
        path.join(urlNoFile, "icon.ico")
      );
    }
    
    const result = await remote.dialog.showMessageBox({
      title: "信息",
      message: "这是信息内容，有多种类型的对话框，更改类型即可。",
      type: "warning", //info、error、question、warning、none
      icon: img, //windows下原本有默认图标，更改后须将不同类型的图标改为不同的，否则将一样，不易区分
      buttons: ["button1", "button1", "button1", "button1", "button1"],
    });

    this.setState(() => ({ txtFileData: "选择的按钮是:" + result.response }));
  };
  public render = (): JSX.Element => {
    return (
      <section>
        <button onClick={this.readTxtFileData}>读取一个txt文件的内容</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.txtFileData }} />
        <button onClick={this.getSelDirectory}>选择一个目录</button>
        <button onClick={this.getSelMulDirectory}>选择多个目录及文件</button>
        <button onClick={this.saveFile}>保存对话框</button>
        <button onClick={this.otherDialog}>其他对话框</button>
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.directoryName.toString(),
          }}
        />
      </section>
    );
  };
}
