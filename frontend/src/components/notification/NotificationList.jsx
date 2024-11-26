import Notification from "./Notification";
import {useEffect} from "react";
import {getUser} from "../../utils/http";

export default function NotificationList({
                                             notifications,
                                             onRemove,
                                             isPrivateChatOpen,
                                             setIsPrivateChatOpen,
                                             setSelectedUser
                                         }) {
    const filteredNotifications = isPrivateChatOpen
        ? notifications.filter(notification => notification.type !== 'MESSAGE')
        : notifications;

    useEffect(() => {
        if (isPrivateChatOpen) {
            notifications.forEach(notification => {
                if (notification.type === 'MESSAGE') {
                    onRemove(notification.timestamp);
                }
            });
        }
    }, [isPrivateChatOpen, notifications, onRemove]);

    return (
        <div className="notification-stack">
            {filteredNotifications.map((notification, index) => (
                <Notification
                    key={index}
                    sender={notification.sender}
                    message={notification.message}
                    duration={notification.duration}
                    isError={notification.isError}
                    style={{top: `${20 + index * 80}px`, right: '20px'}}
                    onClose={() => onRemove(notification.timestamp)}
                    openChat={() => {
                        setIsPrivateChatOpen(true);
                        getUser(notification.sender).then(setSelectedUser);
                    }}
                />
            ))}
        </div>
    );
}