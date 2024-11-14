import { format } from 'date-fns';

export default function Message({ nickname, timestamp, setSelectedUser, children }) {
    const formattedTime = format(new Date(timestamp), 'HH:mm');

    return (
        <div className="chat-zone-monopoly-div">
            <div className="chat-zone-monopoly-message">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={setSelectedUser} className="nickname-span">{nickname}:</a>
                {children}
            </div>
            <p className="chat-zone-monopoly-time">{formattedTime}</p>
        </div>
    );
}