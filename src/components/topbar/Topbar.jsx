import "./topbar.css";
import {Search,ChevronDown } from "react-feather"
import {KeyboardArrowDownRounded} from "@mui/icons-material"
import { useState } from "react";
import {AnimatePresence, easeInOut, motion} from "framer-motion";

export default function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownToggle = isOpen ? "open-dropdown" : "";

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
                        <img className="acc-php" src="https://discussions.apple.com/content/attachment/6692d3b3-c2bb-43df-8b66-a2aa2563039b"/>
                        <p className="acc-username">shoumya</p>
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
                                    initial={{opacity:0, y:-10, transition:{type:"linear", delay:2}}}
                                    animate={{opacity:1, y:0, transition:{type:"linear", delay:2}}}
                                    className="topbar-dropdown-element">Create a group</motion.li>
                                    <motion.li 
                                    initial={{opacity:0, y:-10, transition:{type:"linear", delay:2.2}}}
                                    animate={{opacity:1, y:0, transition:{type:"linear", delay:2.2}}}
                                    className="topbar-dropdown-element">Starred messages</motion.li>
                                    <motion.li 
                                    initial={{opacity:0, y:-10, transition:{type:"linear", delay:2.5}}}
                                    animate={{opacity:1, y:0, transition:{type:"linear", delay:2.5}}}
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
