import React, { useState } from "react";
import { Row, Col } from "antd";
import { webState } from "./state";
import moment from 'moment';//moment自身已经包括的类型声明，这样引用即可
import 'moment/locale/zh-cn';
function Top(props: { initState: webState }) {
    const state = props.initState;
  return (
    <React.Fragment>
      <Row justify="center">
        <Col >
          <h2>{state.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col span={6} push={2}>工作端:</Col>
        <Col span={6}>{state.top.station}</Col>
        <Col span={6}  push={2}>收款员:</Col>
        <Col span={6} >{state.top.receiver}</Col>
      </Row>
      <Row>
        <Col span={6} push={2}>　客户:</Col>
        <Col span={6}>{state.top.custom}</Col>
        <Col span={6}  push={2}>销售员:</Col>
        <Col span={6} >{state.top.saler}</Col>
      </Row>
      <Row>
        <Col span={6} push={2}>　客户:</Col>
        <Col span={18}>{moment(state.top.time).format('YYYY-MM-DD HH:mm:ss')}</Col>
      </Row>
      <Row>
        <Col span={6} push={2}>　单号:</Col>
        <Col span={18}>{state.top.sid}</Col>
      </Row>
    </React.Fragment>
  );
}

export default Top;
