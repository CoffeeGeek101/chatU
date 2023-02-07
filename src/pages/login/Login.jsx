import React, { useState } from 'react'
import "./login.css"
import logo from "../../../../assets/login-hero.jpeg"
import {delay, motion} from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Login() {

    const loginVarient={
        hidden:{opacity:0},
        visible:{opacity: 1, 
        transition: { type:"linear", delay:0.5}},
        exit:{
            opacity:0,
            transition: {ease:'easeInOut', type:"linear"},
        }
    }

    const loginHeroVarient={
        hidden:{opacity:0, x:-550},
        visible:{opacity:1, x:0, 
        transition:{ease:"linear", delay:0.5}}
    }

    const loginFromVarient={
        hidden:{opacity:0, x:850},
        visible:{opacity:1, x:0, 
        transition:{ease:"linear", delay:0.5}}
    }
    const regEmojiVarient={
        hidden:{opacity:0,},
        visible:{opacity:1, 
        transition:{ease:"easeInOut", delay:1.5}}
    }

    const[Error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        try{
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");

        }catch(error){
            setError(true);
        }
    }

    const provider = new GoogleAuthProvider();
    const handleGoogle = async(e) =>{
        e.preventDefault();
        
        try{
            await signInWithPopup(auth, provider).then(async(userCred)=>{
               console.log(userCred.user);

               try{
                await setDoc(doc(db,"users",userCred.user.uid),{
                    uid : userCred.user.uid,
                    displayName : userCred.user.displayName,
                    email : userCred.user.email,
                    photoURL : userCred.user.photoURL,
                   });

                await setDoc(doc(db,"userChats", userCred.user.uid),{});   
                navigate("/");

               }catch(err){
                setError(true);
               }
            });

        }catch(err){
            setError(true);
        }
    };

  return (
    <motion.div 
    variants={loginVarient}
    initial="hidden"
    animate="visible"
    exit="exit"
    className='login-container'>
        <div className='hero-reg-container'>

            <motion.div
            variants={loginHeroVarient}
            className='login-hero-element'>
                {/* <img className='reg-hero-img' src={logo}/> */}
                <div className='reg-hero-des-wrapper'>
                    <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity:1}}
                    transition={{delay:1}}
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
                            <p className='reg-login-des'>New here?</p>
                            <Link to="/signup">
                            <motion.button 
                            whileHover={{scale:[null, 1.1, 1 ]}}
                            className='login-reg-btn'>Sign-in</motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <motion.p
                variants={regEmojiVarient}
                className='emoji-floting emoji-shadow'>&#128522;</motion.p>
                <motion.p 
                variants={regEmojiVarient}
                className='emoji-floting-1 emoji-shadow'>&#128536;</motion.p>
                <motion.p
                variants={regEmojiVarient}
                className='emoji-floting-2 emoji-shadow'>&#128526;</motion.p>
                <motion.p
                variants={regEmojiVarient}
                className='emoji-floting-3 emoji-shadow'>&#128521;</motion.p>
                <motion.p
                variants={regEmojiVarient}
                className='emoji-floting-4 emoji-shadow'>&#129305;</motion.p>
                <motion.p
                variants={regEmojiVarient}
                className='emoji-floting-5 emoji-shadow'>&#127881;</motion.p>
            </motion.div>

            <motion.div
            variants={loginFromVarient}
            className='login-form-container'>
                <div className='login-form-wrapper'>
                    <motion.div
                    initial={{opacity:0, x:-400}}
                    animate={{opacity:1, x:0}}
                    transition={{delay:0.6, type:"spring"}}
                     className='reg-form-header'>
                        <h2>Log in</h2>
                    </motion.div>    
                
                    <form 
                     onSubmit={handleSubmit}
                    className='reg-form'>
                        <motion.div
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.7}}
                        className='reg-form-element'>
                            <div className='reg-form-label'>
                                Email Address
                            </div>
                            <input required className='reg-form-input' type="email" placeholder='Enter your Email'/>
                        </motion.div>
                        <motion.div
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.8}}
                        className='reg-form-element'>
                            <div className='reg-form-label'>
                                Password
                            </div>
                            <input required className='reg-form-input' type="password" placeholder='Enter your Password'/>
                        </motion.div>
                        <motion.button 
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.9}}
                        className='login-form-btn'
                        >Log in</motion.button>
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
                    className='login-form-gAuth'
                    onClick={handleGoogle}
                    >
                        <img className='reg-gAuth-img' src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"/>
                        <div>Continue with Google</div>
                    </motion.button>

                </div>
            </motion.div>
        </div>
    </motion.div>
  )
}
