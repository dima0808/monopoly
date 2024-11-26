import { format } from 'date-fns';

export default function SystemMessage({timestamp, children}) {
    const formattedTime = format(new Date(timestamp), 'HH:mm');

    return (
        <div className="chat-zone-monopoly-div">
            <div className="chat-zone-monopoly-message">
                <span className="system-span">System: </span>
                {children}
            </div>
            <p className="chat-zone-monopoly-time">{formattedTime}</p>
        </div>
    );
}



