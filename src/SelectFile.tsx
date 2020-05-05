import React from "react";
import { remote } from "electron";
import { Slider, InputNumber, Row, Col } from "antd";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import spawn from "child_process";
import { Input } from "antd";
const { TextArea } = Input;
interface Props {}
interface State {
  doc1: string;
  doc2: string;
  num: number;
  percent: number;
  concurrent: number;
  msg: string | undefined;
  time: number; //分析等待时间
  disable: boolean; //按钮是否可用
}

export default class SelectFile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      doc1: "",
      doc2: "",
      num: 100,
      percent: 80,
      concurrent: 50,
      msg: "",
      time: 0,
      disable: false,
    };
  }
  /**
   * 弹出文件选择框，选择 .docx 文件
   * 将选中的 .docx 内容展示到页面
   */
  public selectDoc1File = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .docx 文件",
      //defaultPath: "D:\\Personal\\Desktop",
      properties: ["openFile"],
      //buttonLabel:"请选择",选择窗口按钮的名称
      filters: [
        {
          name: "docx",
          extensions: ["docx"],
        },
      ],
    });

    this.setState(() => ({ doc1: result.filePaths[0] }));
  };
  /**
   * 弹出文件选择框，选择 .docx 文件
   * 将选中的 .docx 内容展示到页面
   */
  public selectDoc2File = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .docx 文件",
      //defaultPath: "D:\\Personal\\Desktop",
      properties: ["openFile"],
      //buttonLabel:"请选择",选择窗口按钮的名称
      filters: [
        {
          name: "docx",
          extensions: ["docx"],
        },
      ],
    });

    this.setState(() => ({ doc2: result.filePaths[0] }));
  };
  onNumChange = (value: any) => {
    console.log(value);
    this.setState(() => ({ num: value }));
  };
  onConcChange = (value: any) => {
    console.log(value);
    this.setState(() => ({ concurrent: value }));
  };
  onPerChange = (value: any) => {
    console.log(value);
    this.setState(() => ({ percent: value }));
  };

  beginExe = () => {
    //设置按钮不可用
    this.setState(() => ({ disable: true }));

    let args: Array<string> = [];
    args.push("--doc1=" + this.state.doc1);
    args.push("--doc2=" + this.state.doc2);
    args.push("--num=" + this.state.num);
    args.push("--percent=" + this.state.percent);
    args.push("--concurrent=" + this.state.concurrent);
    console.log(args.toString());

    // 任何你期望执行的cmd命令，ls都可以
    let cmdStr = "query_repeat.exe" + args;
    // 执行cmd命令的目录，如果使用cd xx && 上面的命令，这种将会无法正常退出子进程
    let cmdPath = "./public/query_repeat.exe";
    if (process.env.NODE_ENV === "development") {
      cmdPath = "./public/query_repeat.exe";
    } else {
      //exe的相对路径，打包后从最外层可执行exe找起。
      cmdPath = "resources/app.asar/build/query_repeat.exe";
    }

    //协助查找文件路径
    const aaa = process.env.PORTABLE_EXECUTABLE_DIR;
    console.log(__dirname);
    console.log(aaa);
    //开始执行打包命令
    spawn.execFile(cmdPath, args, (err: any, stdout: any, stderr: any) => {
      if (err) this.setState(() => ({ msg: err }));
      else {
        //清除定时器
        clearInterval(myVar);
        //计数重置为0
        this.setState(() => ({ time: 0 }));

        //按钮恢复可用
        this.setState(() => ({ disable: false }));
        this.setState(() => ({ msg: stdout }));
        console.log(stdout);
      }
    });
    var myVar = setInterval(() => {
      this.setState(() => ({ time: this.state.time + 1 }));
      this.setState(() => ({
        msg: "正在分析中，请稍候。。。( " + this.state.time + "秒)",
      }));
    }, 1000);
  };

  public render = (): JSX.Element => {
    return (
      <React.Fragment>
        <Row>
          <Col span={4}>选择第一个文档：</Col>
          <Col span={20}>
            {this.state.doc1}
            <button onClick={this.selectDoc1File}>点击选择</button>
          </Col>
        </Row>
        <Row>
          <Col span={4}>选择第二个文档：</Col>
          <Col span={20}>
            {this.state.doc2}
            <button onClick={this.selectDoc2File}>点击选择</button>
          </Col>
        </Row>
        <Row>
          <Col span={4}>比较结果只展示大于以下百分数的：</Col>
          <Col span={16}>
            <Slider
              min={1}
              max={100}
              onChange={this.onPerChange}
              value={
                typeof this.state.percent === "number" ? this.state.percent : 0
              }
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={100}
              style={{ margin: "0 10px" }}
              value={this.state.percent}
              onChange={this.onPerChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>段落少于以下字数的不比较：</Col>
          <Col span={16}>
            <Slider
              min={1}
              max={500}
              onChange={this.onNumChange}
              value={typeof this.state.num === "number" ? this.state.num : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={500}
              style={{ margin: "0 10px" }}
              value={this.state.num}
              onChange={this.onNumChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>并发线程数</Col>
          <Col span={16}>
            <Slider
              min={1}
              max={200}
              onChange={this.onConcChange}
              value={
                typeof this.state.concurrent === "number"
                  ? this.state.concurrent
                  : 0
              }
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={200}
              style={{ margin: "0 10px" }}
              value={this.state.concurrent}
              onChange={this.onConcChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={11}>
            <Button
              type="primary"
              onClick={this.beginExe}
              icon={<SearchOutlined />}
              disabled={this.state.disable}
            >
              开始比较
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {" "}
            <TextArea
              value={this.state.msg}
              placeholder="分析结果展示"
              autoSize={{ minRows: 13, maxRows: 13 }}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  };
}
