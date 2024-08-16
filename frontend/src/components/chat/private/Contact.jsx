import '../styles.css';

export default function Contact({nickname, lastMessage, onClick, isSelected}) {

    return (
        <div className={"your-contact" + (isSelected ? " your-contact-active" : "")} onClick={onClick}>
            <h2 className="your-contact-neekname">{nickname}</h2>
            <p className="your-contact-p">{lastMessage}</p>
        </div>
    );
}