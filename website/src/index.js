import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App url='https://raw.githubusercontent.com/manastalukdar/resume-cv/gh-pages/resources/ManasTalukdar_CV.pdf'/>, document.getElementById('root'));
registerServiceWorker();
