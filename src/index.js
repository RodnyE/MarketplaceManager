
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App'
import eruda from 'eruda'

import './styles/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// browser console in development mode
eruda.init();

// bootstrap dark mode
document.querySelector("html")
   .setAttribute("data-bs-theme", "dark");

// render
const root = createRoot(document.getElementById('root'));
root.render(<App/>);