
import React from 'react';
import ReactDOM from 'react-dom';

import DocumentTitle from 'react-document-title';
ReactDOM.render(
  <React.Fragment> <DocumentTitle title='这是动态生成的子窗口标题'>
    <div>我是一个子窗口</div></DocumentTitle>
  </React.Fragment>,
  document.getElementById('root')
);
 