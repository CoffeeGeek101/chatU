import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router} from "react-router-dom";
import './index.css'
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <Router>
          <App />
        </Router>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
