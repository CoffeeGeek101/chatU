import React, { useContext } from 'react'
import Register from './pages/register/Register'
import logobg from "../../assets/hero-bgg-vid.mp4"
import {BrowserRouter as Router,Navigate,Route, Routes} from "react-router-dom";
import Login from './pages/login/Login';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import "./App.css"
import Home from './pages/home/Home';
import { AuthContext } from './context/AuthContext';


export default function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }

   const location = useLocation();
  return (
    <div className='app'>
        <AnimatePresence>
        <Routes location={location} key={location.key}>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/' element={
          <ProtectedRoute location={location} key={location.key}>
          <Home/>
          </ProtectedRoute>}/>
        </Routes>
        </AnimatePresence>
    </div>
  )
}

