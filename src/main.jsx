import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Remove StrictMode to prevent double renders during development
ReactDOM.createRoot(document.getElementById('root')).render(<App />);