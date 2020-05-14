import React, { useState } from "react";
import moment, { Moment } from "moment";
import "moment/locale/zh-cn";
import { Input, DatePicker } from "antd";
import MyIndexedDBHelper from "./MyIndexedDBHelper";

interface WindowState {
  name?: string;
  age?: number;
  address?: string;
  weight?: number;
  isStudent?: boolean;
  time: number;
}

const initialState: WindowState = {
  name: "string",
  age: 18,
  address: "string",
  weight: 82.3,
  isStudent: true,
  time: 0,
};
function MyIndexedDB() {
  const { TextArea } = Input;
  const [person, setPerson] = useState(initialState); //保存鼠标位置
  const [db, setDB] = useState<MyIndexedDBHelper>(new MyIndexedDBHelper()); //保存鼠标位置

  function onChange(value: moment.Moment | null, dateString: string) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

  function onOk(value: Moment) {
    console.log(moment.locale()); // en
    console.log(moment.duration("23:59:59"));
    console.log(moment([2020, 0, 29]).fromNow());
    console.log("onOk: ", value.milliseconds());
    updateText({ time: value.milliseconds() });
  }

  const createDB = () => {
    db.openDB();
  };
  const addData = () => {
    console.log(person);
    db?.putData(person);
  };
  const changeData = () => {
    console.log(person);

    db?.updateData(person, 1); //修改k为1的数据
  };
  const queryData = () => {
    db?.readData(callbackFun, 1); //传入查询成功后的回调方法
    // updateText({address: JSON.stringify(db?.readData())});//修改k为1的数据
  };

  function callbackFun(result: any) {
    updateText({ address: JSON.stringify(result) });
  }

  const queryDataByCursor = () => {
    //通过游标查询所有数据
    const result = db?.getCursor(callbackFun);
    // updateText({address: JSON.stringify(db?.readData())});//修改k为1的数据
  };

  const delData = () => {
    db?.remove(1); //传入查询成功后的回调方法
    // updateText({address: JSON.stringify(db?.readData())});//修改k为1的数据
  };
  //更新数据
  const updateText = (partialState: any) => {
    setPerson((oldPerson) => ({ ...oldPerson, ...partialState }));
  };
  return (
    <div className="App">
      <DatePicker showTime onChange={onChange} onOk={onOk} />
      <TextArea
        rows={4}
        value={person.address}
        onChange={(e) => updateText({ address: e.target.value })}
      />
      <button onClick={createDB}>创建对象仓库</button>
      <button onClick={addData}>添加数据</button>
      <button onClick={changeData}>修改数据</button>
      <button onClick={queryData}>查询数据</button>
      <button onClick={queryDataByCursor}>通过游标查询数据</button>
      <button onClick={delData}>删除数据</button>
      <div>
        更多方法参见辅助类，也可通过
        <a href="https://jsstore.net/">https://jsstore.net/</a>使用indexdb
      </div>
    </div>
  );
}

export default MyIndexedDB;
