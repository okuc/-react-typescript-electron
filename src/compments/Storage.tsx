import React,{useState} from "react";
import ReactDOM from "react-dom";
import { Input } from 'antd';
function Storage() {
  const { TextArea } = Input;
  
  const [textContent, setText] = useState(""); //保存鼠标位置

  //取出保存的数据，并展示在界面上
  const getText = ()=>{
    let notes = window.localStorage.notes;//notes就是保存的键
   
    setText(notes);
  }  
  const clearText = ()=>{
    setText("");
  }  
  const saveText = ()=>{
    console.log(textContent);
    window.localStorage.setItem("notes",textContent);
  }
  //更新数据
  const updateText = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setText(e.target.value);
  }
  return (
    <div className="App">
      <TextArea rows={4} value={textContent} onChange={updateText}/>
      <button onClick={saveText}>保存数据</button>
      <button onClick={getText}>取出数据</button>
      <button onClick={clearText}>清空文本框数据</button>
    </div>
  );
}

export default Storage;