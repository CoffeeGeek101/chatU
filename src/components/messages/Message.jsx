import "./message.css";

export default function Message() {
  return (
    <>
    <div className="message-container">
        <div className="message-wrapper">
            <img className="message-contact-dp" src="https://i.pinimg.com/736x/4a/4e/9b/4a4e9b3625f0fec5e57dc5fd46d2e55e.jpg"/>
            <div className="message-pkg">
                <p className="message">hey ydddd dddddd ddddd dddda! yddd dddddddd dddddddda!</p>
                <div className="msg-timestamp">
                    <p className="time-msg">just now!</p>
                </div>
            </div>
        </div>
    </div>
    <div className="message-container ">
        <div className="message-wrapper message-owner">
            <img className="message-contact-dp" src="https://discussions.apple.com/content/attachment/6692d3b3-c2bb-43df-8b66-a2aa2563039b"/>
            <div className="message-pkg message-owner">
                <p className="message">hey ydddd dddddd ddddd dddda! yddd dddddddd dddddddda!</p>
                <div className="msg-timestamp">
                    <p className="time-msg">just now!</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
