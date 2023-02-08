import "./topbar.css";
import {Search } from "react-feather"
import {KeyboardArrowDownRounded} from "@mui/icons-material"
import { useContext, useState } from "react";
import {AnimatePresence, easeInOut, motion} from "framer-motion";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { collection, query, where, getDocs, doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownToggle = isOpen ? "open-dropdown" : "";

    const {currentUser} = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    // console.log(username);

    const handleSearch = async() =>{
        const q = query(collection(db, "users"), 
        where("displayName", "==", username));

        try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            setUser(doc.data())
            });
        }catch(error){
            console.log(error);
            setErr(true);
        }
    };

    const handleDelete = () =>{
        const q = query(collection(db, "user"),
        where("displayName", "==", null));

        try{
           setUser(null);
        }catch(err){
            setErr(true);
        }
    }


    const handleKey = (e) =>{
        e.code === "Enter" && handleSearch();
        if(e.code === "Backspace" || e.code === "Delete") handleDelete();
    }


    const handleSelect = async() =>{
        const combinedId = currentUser.uid > user.uid ? 
                           currentUser.uid + user.uid : user.uid + currentUser.uid;
        
         try{
            const res = await getDoc(doc(db, "chats", combinedId));
            if(!res.exists()){
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                await updateDoc(doc(db,"userChats", currentUser.uid),{
                    [combinedId + ".userInfo"]:{
                        uid : user.uid,
                        displayName : user.displayName,
                        photoURL : user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db,"userChats", user.uid),{
                    [combinedId + ".userInfo"]:{
                        uid : currentUser.uid,
                        displayName : currentUser.displayName,
                        photoURL : currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
         }catch(err){
            setErr(true)
         }
         setUser(null);
         setUsername("");
    };

  return (
    <div className="topbar-container">
        <div className="topbar-wrapper">
            <div className="topbar">
                <h1 className="home-logo">chat<span>U</span></h1>   
                <div className="home-search-bar">
                    <div className="batch-1-search">
                        <Search/>
                        <input className="home-srch-input" type="text" placeholder="Search for people" 
                        onKeyDown={handleKey} 
                        onChange={e=>setUsername(e.target.value)} 
                        value={username}/>
                    </div>
                    {user && 
                    <div className="batch-2-search" onClick={handleSelect}>
                        <img src={user.photoURL} className="searched-user-img"/>
                        <p className="searched-user-name">{user.displayName}</p>
                    </div>
                    }
                </div>

                <div className="topbar-acc-sec">
                    <div className="account-detail">
                        <img className="acc-php" src={currentUser.photoURL}/>
                        <p className="acc-username">{currentUser.displayName}</p>
                        
                        <motion.nav 
                        className="topbar-dropdown">
                            
                            <motion.div
                            initial={{rotate:0}}
                            whileHover={isOpen ? { y:-5, rotate: 180, transition:{duration:0.2}} : {rotate:0}}
            
                            >
                            <KeyboardArrowDownRounded className="dropdown-action" onClick={()=>setIsOpen(!isOpen)}/>
                            </motion.div>
                                <AnimatePresence>
                                <motion.ul
                                animate={isOpen ? {opacity:1, y:20, transition:{type:"spring", stiffness:60}}:{}}
                                exit={!isOpen ?{opacity: 0, transition:{type:"linear", y:-10}}:{}}
                                className={`topbar-dropdown-container ${dropdownToggle}`}>
                                    <motion.li 
                                    className="topbar-dropdown-element">Create a group</motion.li>
                                    <motion.li 
                                    className="topbar-dropdown-element">Starred messages</motion.li>
                                    <motion.li 
                                    onClick={()=> signOut(auth)}
                                    className="topbar-dropdown-element">Logout</motion.li>
                                </motion.ul>
                                </AnimatePresence>
                        </motion.nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
