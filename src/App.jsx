import React from 'react'
import Register from './pages/register/Register'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Login from './pages/login/Login';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

