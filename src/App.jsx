import React from 'react'
import Register from './pages/register/Register'
import logobg from "../../assets/hero-bgg-vid.mp4"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Login from './pages/login/Login';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import "./App.css"


export default function App() {
   const location = useLocation();
  return (
    <div className='app'>
        <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        </AnimatePresence>
    </div>
  )
}

