import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import './style/common.less'
import registerServiceWorker from './registerServiceWorker';
import ERouter from './router'


ReactDOM.render(<ERouter />, document.getElementById('root'));
registerServiceWorker();
