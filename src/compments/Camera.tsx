import React, { useState } from "react";

import { remote, webFrame, ipcRenderer, Tray, autoUpdater } from "electron";

interface Props {}
interface State {}
class Camera extends React.Component<Props, State> {
  video_reference = React.createRef<HTMLVideoElement>();
  async componentDidMount() {
    //此处代码为页面一加载就调用摄像头
    // if (this.video_reference.current) {
    //     let video_stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
    //     this.video_reference.current.srcObject = video_stream
    // }
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
  render() {
    return (
      <>
        <div>调用本地摄像头</div>
        <button onClick={this.getCamera}>开始调用摄像头</button>
        <video autoPlay ref={this.video_reference}></video>
        {/* // <video ref={this.video_reference} id="player" autoPlay >         </video> */}
      </>
    );
  }
}

export default Camera;
