import Notification from "./Notification";

export default function NotificationList({notifications, onRemove}) {
    return (
        <div className="notification-stack">
            {notifications.map((notification, index) => (
                <Notification
                    key={index}
                    message={notification.message}
                    duration={notification.duration}
                    isError={notification.isError}
                    style={{top: `${20 + index * 80}px`, right: '20px'}}
                    onClose={() => onRemove(notification.timestamp)}
                />
            ))}
        </div>
    );
}