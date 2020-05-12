import React, { useState } from "react";

import { remote, webFrame,ipcRenderer,Tray, autoUpdater} from "electron";

const PreImg = () => {

  const [imgSrc, setImg] = useState(""); //保存图像位置

//   <!--拖放：
//   拖动的对象，需要设置draggable属性为true(draggable="true"),
//   a元素需要href，img元素需要src。
//   1、被拖对象：dragstart事件，被拖动的元素，开始拖放触发
//   2、被拖对象：drag事件，被拖放的元素，拖放过程中
//   3、经过对象：dragenter事件，拖放过程中鼠标经过的元素，被拖放的元素“开始”进入其它元素范围内（刚进入）
//   4、经过对象：dragover事件，拖放过程中鼠标经过的元素，被拖放的元素正在本元素范围内移动(一直)
//   5、经过对象：dragleave事件，拖放过程中鼠标经过的元素，被拖放的元素离开本元素范围
//   6、目标地点：drop事件，拖放的目标元素，其他元素被拖放到本元素中
//   7、被拖对象：dragend事件，拖放的对象元素，拖放操作结束
// -->
  const dropEvent = (e:React.DragEvent)=>{
    e.preventDefault();
    const files:FileList = e.dataTransfer?.files;
    console.log(files);//将拖动的多个文件都打印出来
    console.log(files.length);//拖动的文件个数
    const item = files.item(0);
   // if (typeof item === "string") {//仅基本类型可用这种方法
   if(item instanceof File){
    setImg(item.path);//注意要关闭安全设置
  }
   
}
const drapOverEvent = (e:React.DragEvent)=>{
   e.preventDefault();//阻止此事件，drop事件才会生效
   // setImg(files.item.toString);
}
  return (
    <div>
      <div>预览图片内容</div>
      <div style={{background:"red",width:"50px",height:"50px"}} onDrop={dropEvent} onDragOver={drapOverEvent}>  </div>
      <p/>
      <label>请将图像文件拖动到这个红色区域（可拖放多个，但是只显示一个）</label>
      <p/>
      <img src={imgSrc} style={{'maxWidth':"300px",'maxHeight':"300px",width:"auto",height:"auto"}} />
     <p></p>
      <label>16*16</label><img src={imgSrc} style={{'margin':"0px",'padding':"0px","width":"16px","height":"16px"}} />
     <p></p>
      <label>32*32</label><img src={imgSrc} style={{'margin':"0px",'padding':"0px",width:"32px",height:"32px"}} />
     <p></p>
      <label>64*64</label><img src={imgSrc} style={{'margin':"0px",'padding':"0px",width:"64px",height:"64px"}} />
     <p></p>
      <label>128*128</label><img src={imgSrc} style={{'margin':"0px",'padding':"0px",width:"128px",height:"128px"}} />
     <p></p>
      <label>256*256</label><img src={imgSrc} style={{'margin':"0px",'padding':"0px",width:"256px",height:"256px"}} />
    </div>
  );
};

export default PreImg;
