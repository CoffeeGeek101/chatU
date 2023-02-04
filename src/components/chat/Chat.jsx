import "./chat.css";
import{ArrowDropDownRounded, CallRounded, EmojiEmotionsRounded, IosShareRounded, SendRounded, VideocamRounded} from "@mui/icons-material";
import Message from "../messages/Message";

export default function Chat() {
  return (
    <div className="chat-container">

      <div className="contact-topbar-container">
        <div className="contact-heading">
          <img className="contact-dp" src="https://i.pinimg.com/736x/4a/4e/9b/4a4e9b3625f0fec5e57dc5fd46d2e55e.jpg"/>
          <p className="contact-name">Shreya</p>
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
        <Message/>
        <Message/>
      </div>

      <div className="message-input-container">
        <div className="chat-utility-logo-2">
          <EmojiEmotionsRounded className="utility-logo"/>
          <IosShareRounded className="utility-logo"/>
        </div>
        <div className="chat-message-input">
          <input className="chat-msg-input-box" type="text" placeholder="say something..."/>
        </div>
        <div className="chat-send-btn">
        <SendRounded className="utility-logo"/>
        </div>
      </div>
    </div>
  )
}
