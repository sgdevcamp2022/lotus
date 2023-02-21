import React from 'react';
import { render } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '@layouts/App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(<App />);
