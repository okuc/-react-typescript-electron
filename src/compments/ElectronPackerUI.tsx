import React, { useState, ChangeEvent } from "react";
import { Button, Input, Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import { remote } from "electron";
import spawn from "child_process";
interface PackageState {
  src: string; //工程目录
  des: string; //输出目录
  name: string; //应用程序名称
  asar: boolean; //是否加密
  oss: Array<CheckboxValueType>; //为那些系统打包
}

const initialState: PackageState = {
  src: "", //工程目录
  des: "", //输出目录
  name: "", //应用程序名称
  asar: true, //是否加密
  oss: [], //为那些系统打包
};

function ElectronPackerUI() {
  const [packageState, setPackageState] = useState(initialState);

  const [msg, setMsg] = useState("");

  function onChange(checkedValues: CheckboxValueType[]) {
    setPackageState((oldState) => ({ ...oldState, ...{ oss: checkedValues } }));
  }
  function onChangeA(e: CheckboxChangeEvent) {
    setPackageState((oldState) => ({
      ...oldState,
      ...{ asar: e.target.checked },
    }));
  }
  const onChangeAppName=(e:  ChangeEvent<HTMLInputElement>)=> {
    //setState是异步方法，所以尽量别用动态的e   
    const value = e.target.value;
      console.log(e.target.value)
    setPackageState((oldState) => ({
      ...oldState,
      ...{ name: value },
    }));
  }
  const plainOptions = ["win32", "linux", "darwin"];
  const beginPackage = () => {
    let args: Array<string> = [];
    args.push(packageState.src);
    args.push(packageState.name);
    args.push("--out=" + packageState.des);
    args.push("--electron-version=8.2.5");
    if (packageState.asar) {
      args.push("--asar");
    }

    args.push('--platfrom='+packageState.oss.toString());

    console.log(args.toString());
    //开始执行打包命令
    spawn.execFile(
      "electron-packager.cmd",
      args,
      (err: any, stdout: any, stderr: any) => {
        if (err) setMsg("打包失败");
        else setMsg("打包成功");
      }
    );

    setMsg("正在打包中，请稍候...");
  };

  /**
   * 弹出文件选择框，选择目录
   * 将选中的 文件夹中的文件列表展示到页面
   */
  const getsrcDirectory = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .txt 文件",
      defaultPath: "D:\\Personal\\Desktop",
      properties: ["openDirectory"],
      // properties: ["openFile","multiSelections"],//多选，可以同时选择文件和目录
      //buttonLabel:"请选择",选择窗口按钮的名称
    });
    if (result)
      setPackageState((oldState) => ({
        ...oldState,
        ...{ src: result.filePaths[0] },
      }));
  };
  const getdesDirectory = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: "请选择 .txt 文件",
      defaultPath: "D:\\Personal\\Desktop",
      properties: ["openDirectory"],
      // properties: ["openFile","multiSelections"],//多选，可以同时选择文件和目录
      //buttonLabel:"请选择",选择窗口按钮的名称
    });
    if (result)
      setPackageState((oldState) => ({
        ...oldState,
        ...{ des: result.filePaths[0] },
      }));
  };
  return (
    <div>
      <Button onClick={getsrcDirectory}>请选择Electron工程目录</Button>
      <div>{packageState.src}</div>
      <Button onClick={getdesDirectory}>请选择输出目录</Button>
      <div>{packageState.des}</div>
      应用程序名称：
      <Input placeholder="应用程序名称" onChange={onChangeAppName} />
      <Checkbox onChange={onChangeA}>asar</Checkbox>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={["win32"]}
        onChange={onChange}
      />
      
      <button onClick={beginPackage}>开始打包</button>
      <div>{msg}</div>
    </div>
  );
}
export default ElectronPackerUI;
