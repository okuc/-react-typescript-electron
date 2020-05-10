
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import DocumentTitle from 'react-document-title';
ReactDOM.render(
  <React.Fragment> 
    <DocumentTitle title='这是动态生成的子窗口标题'>
      <App></App>
    </DocumentTitle>
  </React.Fragment>,
  document.getElementById('root')
);
 