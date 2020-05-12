import React, { useState } from "react";

import { remote } from "electron";
import fs from "fs";

interface Props {}
interface State {}
class Camera extends React.Component<Props, State> {
  video_reference = React.createRef<HTMLVideoElement>();
  canvas_reference = React.createRef<HTMLCanvasElement>();
  img_reference = React.createRef<HTMLImageElement>();
  async componentDidMount() {
    //此处代码为页面一加载就调用摄像头
    // if (this.video_reference.current) {
    //     let video_stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
    //     this.video_reference.current.srcObject = video_stream
    // }

    if (this.img_reference.current) {
      this.img_reference.current.src =
        "http://attach.bbs.miui.com/forum/201306/23/110328s72xxse7lfis9fnd.jpg";
    }
  }

  getCamera = () => {
    window.navigator.getUserMedia(
      { video: true, audio: true },
      (localMediaStream) => {
        if (this.video_reference.current) {
          this.video_reference.current.srcObject = localMediaStream;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  //截图
  photoFromCamera = () => {
    if (this.video_reference.current) {
      console.log(
        this.video_reference.current.videoWidth,
        this.video_reference.current.videoHeight
      );
      this.canvas_reference.current
        ?.getContext("2d")
        ?.drawImage(
          this.video_reference.current,
          0,
          0,
          this.video_reference.current.videoWidth,
          this.video_reference.current.videoHeight,
          0,
          0,
          500 / 2,
          400 / 2
        );
    }
  };
  //截图
  photoFromImage = () => {
    if (this.img_reference.current) {
      console.log(
        this.img_reference.current.offsetWidth,
        this.img_reference.current.offsetHeight
      );
      console.log(
        this.img_reference.current.naturalWidth,
        this.img_reference.current.naturalHeight
      );
      console.log(
        this.img_reference.current.scrollWidth,
        this.img_reference.current.scrollHeight
      );
      console.log(
        this.img_reference.current.clientWidth,
        this.img_reference.current.clientHeight
      );
      this.canvas_reference.current
        ?.getContext("2d")
        ?.drawImage(
          this.img_reference.current,
          0,
          0,
          this.img_reference.current.naturalWidth,
          this.img_reference.current.naturalHeight,
          0,
          0,
          500 / 2,
          400 / 2
        );
    }
  };

  //保存图象
  savePhoto = () => {
    if (this.canvas_reference.current) {
      const dataMeta = this.canvas_reference.current
        .toDataURL("image/png")
        .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

      const filePath = remote.dialog.showSaveDialogSync({
        title: "保存图像",
        defaultPath: "D:\\Personal\\Desktop\\face.png",
        nameFieldLabel: "保存位置",
        buttonLabel: "保存", //,选择窗口按钮的名称
      });

      if (filePath) {
        //如果选择了路径
        fs.writeFile(filePath, dataMeta, "base64", (err) => {
          if (err) {
            alert("保存图像有问题：${err.message}");
          }
        });
      }
    }
  };
  render() {
    return (
      <>
        <div>调用本地摄像头</div>
        <button onClick={this.getCamera}>开始调用摄像头</button>
        <button onClick={this.photoFromCamera}>从视频拍照</button>
        <button onClick={this.photoFromImage}>从图像拍照</button>
        <button onClick={this.savePhoto}>保存到本地</button>
        <img
          ref={this.img_reference}
          style={{
            margin: "0px",
            padding: "0px",
            width: "500px",
            height: "400px",
          }}
        ></img>
        <video
          autoPlay
          ref={this.video_reference}
          style={{
            margin: "0px",
            padding: "0px",
            width: "500px",
            height: "400px",
          }}
        ></video>
        <canvas
          ref={this.canvas_reference}
          style={{
            margin: "0px",
            padding: "0px",
            width: "500px",
            height: "400px",
          }}
        ></canvas>
      </>
    );
  }
}

export default Camera;
