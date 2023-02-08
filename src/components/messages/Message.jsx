import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./message.css";

export default function Message({message}) {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const ref = useRef();

    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"});
    },[message])

  return (
    <>
    <div ref={ref} className="message-container">
        <div className={`message-wrapper ${message.senderID === currentUser.uid && "message-owner"}`}>
            <img className="message-contact-dp" src={message.senderID === currentUser.uid  ? currentUser.photoURL : data.user.photoURL}/>
            <div className={`message-pkg ${message.senderID === currentUser.uid && "message-owner"}`}>
                <p className="message">{message.text}</p>
                <div className="msg-timestamp">
                    <p className="time-msg">just now!</p>
                </div>
            </div>
        </div>
    </div>

    {/* <div className="message-container ">
        <div className="message-wrapper message-owner">
            <img className="message-contact-dp" src="https://discussions.apple.com/content/attachment/6692d3b3-c2bb-43df-8b66-a2aa2563039b"/>
            <div className="message-pkg message-owner">
                <p className="message">hey ydddd dddddd ddddd dddda! yddd dddddddd dddddddda!</p>
                <div className="msg-timestamp">
                    <p className="time-msg">just now!</p>
                </div>
            </div>
        </div>
    </div> */}
    </>
  )
}
