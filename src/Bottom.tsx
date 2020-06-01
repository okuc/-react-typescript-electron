import React,{useState} from 'react';
import { Row, Col } from 'antd';
import {webState} from './state';
import moment from 'moment';//moment自身已经包括的类型声明，这样引用即可
import 'moment/locale/zh-cn';
function Bottom(props: { initState: webState; }) {
    const state = props.initState;
    return (
        <React.Fragment>

<Row justify="center">
        <Col >消费合计:
        </Col>
        <Col >{state.bottom.all}
        </Col>
      </Row>
<Row>
        <Col span={5} push={2}>实收:</Col>
        <Col span={5}>{state.bottom.receipts}</Col>
        <Col span={5}  push={2}>现金:</Col>
        <Col span={5} >{state.bottom.payment}</Col>
      </Row>

      <Row>
        <Col span={5} push={2}>找零:</Col>
        <Col span={19}>{state.bottom.change}</Col>
      </Row>
      <Row>
        <Col span={5} push={2}>打印:</Col>
        <Col span={19}>{moment(state.bottom.printTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
      </Row>
      <Row>
        <Col span={24
        } push={2}>欢迎再次光临</Col>
      </Row>
        </React.Fragment>
    )}
    
export default Bottom;