import "./topbar.css";
import {Search,ChevronDown } from "react-feather"
import {KeyboardArrowDownRounded} from "@mui/icons-material"
import { useContext, useState } from "react";
import {AnimatePresence, easeInOut, motion} from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownToggle = isOpen ? "open-dropdown" : "";

    const {currentUser} = useContext(AuthContext);

  return (
    <div className="topbar-container">
        <div className="topbar-wrapper">
            <div className="topbar">
                <h1 className="home-logo">chat<span>U</span></h1>   
                <div className="home-search-bar">
                    <Search/>
                    <input className="home-srch-input" type="text" placeholder="Search for people"/>
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
                                
                                <motion.ul
                                animate={isOpen ? {opacity:1, y:20, transition:{type:"spring", stiffness:60}}:
                                {opacity:0, y:-20, transition:{type:"spring",stiffness:100}}}
                                className={`topbar-dropdown-container ${dropdownToggle}`}>
                                    <motion.li 
                                    className="topbar-dropdown-element">Create a group</motion.li>
                                    <motion.li 
                                    className="topbar-dropdown-element">Starred messages</motion.li>
                                    <motion.li 
                                    onClick={()=> signOut(auth)}
                                    className="topbar-dropdown-element">Logout</motion.li>
                                </motion.ul>
                        </motion.nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
