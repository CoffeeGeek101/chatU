import { useContext, useEffect, useState } from "react";
import "./chatbook.css";
import "../contacts/contact.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export default function Chatbook() {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{
    const getChats = () =>{
    const unsub = onSnapshot(doc(db,"userChats", currentUser.uid),(doc)=>{
      setChats(doc.data());
    });
    return ()=>{
      unsub();
    }
  };

  currentUser.uid && getChats()
  },[currentUser.uid])

  console.log(Object.entries(chats))

  const handleSelect = (u) =>{
    dispatch({type: "CHANGE_USER", payload:u})
  }


  return (
    <div className="chatbook-container">
        <div className="chatbook-wrapper">
              {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
                <div className="contact-container" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                  <div className="contact-wrapper">
                      <img className="contact-img" src={chat[1].userInfo.photoURL} />
                      <div className="contact-chat">
                          <h4 className="contact-id">{chat[1].userInfo.displayName}</h4>
                          <div className="chat-snippet">{chat[1].lastMessage?.text}</div>
                      </div>
                      <div className="chat-info">
                          <p className="time-stamp">just now</p>
                          <div className="chat-notification">1</div>
                      </div>
                  </div>
              </div>
              ))}
        </div>
    </div>
  )
}
