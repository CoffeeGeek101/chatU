import "./chat.css";
import{ArrowDropDownRounded, CallRounded, EmojiEmotionsRounded, IosShareRounded, SendRounded, VideocamRounded} from "@mui/icons-material";
import Message from "../messages/Message";
import {useContext, useState, useEffect} from "react";
import {ChatContext} from "../../context/ChatContext";
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { AuthContext } from "../../context/AuthContext";
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Chat() {

  const{data} = useContext(ChatContext);
  const{currentUser} = useContext(AuthContext);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const[messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db,"chats", data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
  
    return () => {
      unSub();
    }
  }, [data.chatId])
  

  const handelSend = async()=>{

    if(img){
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
        try {

          await updateDoc(doc(db, "chats", data.chatId),{
            messages: arrayUnion({
              id: uuid(),
              text,
              senderID : currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });

            }catch(err){
                // console.log(err);
                setError(true);
            }
        });
    });
    }else{
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID : currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId + ".lastMessage"] :{
        text,
      },
      [data.chatId + ".date"] : serverTimestamp(),
    })

    setText("");
    setImg(null);
  };


  return (
    <div className="chat-container">

      <div className="contact-topbar-container">
        <div className="contact-heading">
          <img className="contact-dp" src={data.user.photoURL}/>
          <p className="contact-name">{data.user?.displayName}</p>
        </div>
        <div className="contact-operations">
          <div className="chat-utility">
            <VideocamRounded className="utility-logo"/>
            <CallRounded className="utility-logo"/>
            <ArrowDropDownRounded className="utility-logo"/>
          </div>
        </div>
      </div>

      <div className="chat-message-container">
        {messages.map(m=>(
        <Message message={m} key={m.id}/>
        ))}
      </div>

      <div className="message-input-container">
        <form className="input-message-form">
        <div className="chat-utility-logo-2">
          <EmojiEmotionsRounded className="utility-logo"/>
          <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
         <label htmlFor="file">
          <IosShareRounded className="utility-logo"/>
          </label>
        </div>
        <div className="chat-message-input">
          <input 
          className="chat-msg-input-box" 
          type="text" 
          placeholder="say something..."
          onChange={(e)=>setText(e.target.value)}
          value={text}
          />
        </div>
        </form>
        <div className="chat-send-btn">
        <SendRounded 
        onClick={handelSend}
        className="utility-logo"/>
        </div>
      </div>
    </div>
  )
}
