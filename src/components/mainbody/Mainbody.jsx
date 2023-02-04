import Chat from "../chat/Chat";
import Chatbook from "../chatbook/Chatbook";
import "./mainbody.css";

export default function Mainbody() {
  return (
    <div className="body-container">
        <div className="body-wrapper">
          <Chatbook/>
          <Chat/>
        </div>
    </div>
  )
}
