import React,{
    useState
} from "react";
import Top from './Top'
import Content from './Content'
import Bottom from './Bottom'
 
import {webState} from './state';
function Frame_right(props: { initState: webState; }) {
  return (
    <React.Fragment>
      <Top initState={props.initState}/>
      <Content initState={props.initState}/>
      <Bottom initState={props.initState}/>
    </React.Fragment>
  );
}

export default Frame_right;
