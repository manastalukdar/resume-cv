import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// import { unregister } from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App url='ManasTalukdar_cv.pdf'/>);
// unregister();

// If you want to enable service worker in production, import and call register from './registerServiceWorker' here.
// import register from './registerServiceWorker';
// if (import.meta.env.PROD) register();
