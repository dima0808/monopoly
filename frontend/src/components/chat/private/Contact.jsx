import '../styles.css';
import Cookies from "js-cookie";

export default function Contact({nickname, lastMessage, onClick, isSelected, unreadMessages}) {
    return (
        <div className={"your-contact" + (isSelected ? " your-contact-active" : "")} onClick={onClick} style={{ position: 'relative' }}>
            <h2 className="your-contact-nickname">{nickname}</h2>
            <p className="your-contact-p">{lastMessage?.content}</p>
            {(unreadMessages > 0 && Cookies.get("username") === lastMessage?.receiver) &&
                <div className="unread-messages">{unreadMessages > 9 ? "9+" : unreadMessages}</div>}
        </div>
    );
}