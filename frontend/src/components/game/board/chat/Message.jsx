import { format } from 'date-fns';
import {Link} from "react-router-dom";

export default function Message({ nickname, timestamp, children }) {
    const formattedTime = format(new Date(timestamp), 'HH:mm');

    return (
        <div className="chat-zone-monopoly-div">
            <p className="chat-zone-monopoly-message">
                <Link to={"/profile/" + nickname} className="nikname-span">{nickname}:</Link>
                {children}
            </p>
            <p className="chat-zone-monopoly-time">{formattedTime}</p>
        </div>
    );
}