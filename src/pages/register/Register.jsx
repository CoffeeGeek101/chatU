import React from 'react'
import "./register.css"
import logo from "../../../../assets/reg-hero.jpg"
import {delay, motion} from "framer-motion";
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className='register-container'>
        <div className='hero-reg-container'>

            <motion.div
            initial={{x:-550}}
            animate={{x:0}}
            transition={{ease:"linear"}}
            className='reg-hero-element'>
                {/* <img className='reg-hero-img' src={logo}/> */}
                <div className='reg-hero-des-wrapper'>
                    <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity:1}}
                    transition={{delay:0.5}}
                    className='reg-hero-des'>
                        <h2 className='reg-app-logo'>ChatU</h2>
                        <div className='reg-des-container'>
                            <div className='app-tag-line'>LONG OR SHORT CONVOS</div>
                            <span className='app-tag-line-2'>we are with<span>U</span></span>
                            <p className='reg-app-des'>
                                time with real people, should be real-time. come join us and keep connected with your real people. <span>We gotcha!</span>
                            </p>
                        </div>
                        <div className='reg-login-container'>
                            <p className='reg-login-des'>Already got an Account?</p>
                            <Link to="/login">
                            <motion.button 
                            whileHover={{scale:[null, 1.1, 1 ]}}
                            className='reg-login-btn'>Log-in</motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
            initial={{x: 850}} 
            animate={{x: 0}}
            transition={{ease: "anticipate" , delay:0.2}}
            className='reg-form-container'>
                <div className='reg-form-wrapper'>
                    <motion.div
                    initial={{opacity:0, x:-400}}
                    animate={{opacity:1, x:0}}
                    transition={{delay:0.6, type:"spring"}}
                     className='reg-form-header'>
                        <h2>Sign Up</h2>
                    </motion.div>    
                
                    <form className='reg-form'>
                    <motion.div
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.7}}
                        className='reg-form-element'>
                            <div className='reg-form-label'>
                                Username
                            </div>
                            <input className='reg-form-input' type="text" placeholder='Enter your username'/>
                        </motion.div>
                        <motion.div
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.7}}
                        className='reg-form-element'>
                            <div className='reg-form-label'>
                                Email Address
                            </div>
                            <input className='reg-form-input' type="email" placeholder='Enter your Email'/>
                        </motion.div>
                        <motion.div
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.8}}
                        className='reg-form-element'>
                            <div className='reg-form-label'>
                                Password
                            </div>
                            <input className='reg-form-input' type="password" placeholder='Enter your Password'/>
                        </motion.div>
                        <motion.button 
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.9}}
                        className='reg-form-btn'>Sign up</motion.button>
                    </form>

                    <motion.div 
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.9}}
                    className='reg-form-separator'>
                        <div className='reg-form-line'></div>
                        <span>or</span>
                        <div className='reg-form-line'></div>
                    </motion.div>
                    
                    <motion.button 
                    initial={{ opacity:0}}
                    animate={{ opacity:1}}
                    transition={{delay:1}}
                    className='reg-form-gAuth'>
                        <img className='reg-gAuth-img' src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"/>
                        <div>Continue with Google</div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    </div>
  )
}