import Mainbody from "../../components/mainbody/Mainbody";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";
import {motion} from "framer-motion";

export default function Home() {

  const homeVarient ={
    hidden : {opacity : 0},
    visible : {opacity: 1,
      transition:{type:"linear", delay: 0.5},
    },
    exit:{
      opacity:0,
      transition: {ease:'easeInOut', type:"linear"},
    }
  }

  return (
    <motion.div
    variants={homeVarient}
    initial="hidden"
    animate="visible"
    exit="exit"
    className='home-container'>
        <div className='home-wrapper'>
            <Topbar/>
            <Mainbody/>
        </div>
    </motion.div>
  )
}
