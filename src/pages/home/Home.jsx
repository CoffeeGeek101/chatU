import Mainbody from "../../components/mainbody/Mainbody";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

export default function Home() {
  return (
    <div className='home-container'>
        <div className='home-wrapper'>
            <Topbar/>
            <Mainbody/>
        </div>
    </div>
  )
}
