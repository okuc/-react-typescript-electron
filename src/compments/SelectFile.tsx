import React from "react";
import { remote } from "electron";
import fs from "fs";

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
   * 弹出文件选择框，选择 .txt 文件
   * 将选中的 .txt 内容展示到页面
   */
  public getSelDirectory = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .txt 文件",
      defaultPath: "D:\\Personal\\Desktop",
      properties: ["openDirectory"],
      //buttonLabel:"请选择",选择窗口按钮的名称
      filters: [
        {
          name: "txt",
          extensions: ["txt"],
        },
      ],
    });

    let allFiles1: Array<string> = [];
    let files = fs.readdirSync(result.filePaths[0]);
    files.forEach(function (item, index) {
      allFiles1.push(item);
    });

    this.setState(() => ({ directoryName: allFiles1 }));
  };

  public render = (): JSX.Element => {
    return (
      <section>
        <button onClick={this.readTxtFileData}>读取一个txt文件的内容</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.txtFileData }} />
        <button onClick={this.getSelDirectory}>选择一个目录</button>
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.directoryName.toString(),
          }}
        />
      </section>
    );
  };
}
