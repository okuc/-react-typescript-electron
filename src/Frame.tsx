import React from 'react';
import { Row, Col } from 'antd';
import initState from './state'
import Frame_right from './Frame_right'
function Frame() {
    return (
        <React.Fragment>
            <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>
                <Frame_right initState={initState}></Frame_right>
            </Col>
            </Row>
        </React.Fragment>
    )}
    
export default Frame;