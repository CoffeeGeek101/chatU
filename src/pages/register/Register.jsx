import React, { useState } from 'react'
import "./register.css"
import logo from "../../../assets/reg-hero.jpg"
import {delay, motion} from "framer-motion";
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from 'firebase/auth';
import{ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { auth, db, storage } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
// import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const regVarient ={
        hidden:{opacity: 0},
        visible: { opacity: 1,
                transition: {delay: 0.5, type:"linear"},
        },
        exit:{
            opacity:0,
            transition:{ease:'easeInOut', type:"linear"}
        }
    }

    const regHeroVarient={
        hidden:{opacity:0, x:-550},
        visible:{opacity:1, x:0, 
        transition:{ease:"linear", delay:0.5}}
    }

    const regFormVarient={
        hidden:{opacity:0, x:800},
        visible:{opacity:1, x:0, 
        transition:{ease:"linear", delay:0.5}}
    }

    const regEmojiVarient={
        hidden:{opacity:0,},
        visible:{opacity:1, 
        transition:{ease:"easeInOut", delay:1.5}}
    }

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const file = e.target[1].files[0];
        const email = e.target[2].value;
        const password = e.target[3].value;
       
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password); 

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    
                    await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                    });
                   
                    await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                    });
                    
                    await setDoc(doc(db,"userChats", res.user.uid),{});
                    navigate("/");
                    }catch(err){
                        // console.log(err);
                        setError(true);
                    }
                });
            });
        }catch(err){
            setError(true);
        }
            
    };

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
    variants={regVarient}
    initial="hidden"
    animate="visible"
    exit="exit"
    className='register-container'>
        <div className='hero-reg-container'>
            <motion.div
            variants={regHeroVarient}
            className='reg-hero-element'>
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
                            <p className='reg-login-des'>Already got an Account?</p>
                            <Link to="/login">
                            <motion.button 
                            whileHover={{scale:[null, 1.1, 1 ]}}
                            className='reg-login-btn'>Log-in</motion.button>
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
            variants={regFormVarient}
            className='reg-form-container'>
                <div className='reg-form-wrapper'>
                    <motion.div
                    initial={{opacity:0, x:-400}}
                    animate={{opacity:1, x:0}}
                    transition={{delay:0.6, type:"spring"}}
                     className='reg-form-header'>
                        <h2>Sign Up</h2>
                    </motion.div>    

                    <form className='reg-form' onSubmit={handleSubmit}>
            
                    <motion.div
                        initial={{ opacity:0}}
                        animate={{ opacity:1}}
                        transition={{delay:0.7}}
                        className='reg-form-element'>
                                <div className='reg-form-label'>
                                    Username
                                </div>
                                <input required className='reg-form-input' type="text" placeholder='Enter your username'/>      
                        </motion.div>
                                <input required style={{display:"none"}} type= "file" id="file"/>   
                                <label className='reg-upload-dp' htmlFor="file">
                                        <img src='https://i.pinimg.com/originals/e0/57/7a/e0577a5fa87f06c4ebf7292ee1191711.jpg'/>
                                        <p>Select your Avatar</p>
                                </label>          
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
                        whileHover={{scale:[null, 1.06, 1]}}
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
                    onClick={(e)=>handleGoogle(e)}
                    className='reg-form-gAuth'>
                        <img className='reg-gAuth-img' src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"/>
                        <div>Continue with Google</div>
                    </motion.button>
                    
                </div>
            </motion.div>
            
        </div>
    </motion.div>
  )
}
