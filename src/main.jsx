import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register all GSAP plugins once at the app entry point.
// useGSAP must be registered so React Strict Mode double-invocation is handled correctly.
gsap.registerPlugin(ScrollTrigger, useGSAP);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
