import React,{useState} from 'react';
import { Row, Col } from 'antd';
import {webState} from './state';
function Content(props: { initState: webState; }) {
    const state = props.initState;
const list = state.content.map((item, index) => {
    return (
        <Row>
        <Col span={9} >{item.name}</Col>
        <Col span={5}>{item.num}</Col>
        <Col span={5}>{item.price}</Col>
        <Col span={5} >{item.all}</Col>
        </Row>
    );});
    return (
        <React.Fragment>
        <Row>
        <hr style={{width: '100%',height:1,border:'none',borderTop:'1px dashed #595959'}} />
        </Row>
        <Row>
        <Col span={9} >品名</Col>
        <Col span={5}>数量</Col>
        <Col span={5}>单价</Col>
        <Col span={5} >金额</Col>
        </Row>
        {list}
        <Row>
        <hr style={{width: '100%',height:1,border:'none',borderTop:'1px dashed #595959'}} />
        </Row>
        <Row>
        <hr style={{width: '100%',height:1,border:'none',borderTop:'1px dashed #595959'}} />
        </Row>
        </React.Fragment>
    )}
    
export default Content;




