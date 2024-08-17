export function onNotificationReceived(navigate, message, setNotifications) {
    const notification = JSON.parse(message.body);
    if (notification.type === 'KICK' || notification.type === 'DELETE') {
        navigate('/');
    }
    setNotifications(prev => [...prev, {
        sender: notification.sender,
        message: notification.message,
        type: notification.type,
        duration: 3500,
        isError: false,
        timestamp: notification.timestamp
    }]);
}

export function onErrorReceived(message, setNotifications) {
    const error = JSON.parse(message.body);
    setNotifications(prev => [...prev, {
        message: error.message,
        duration: 3500,
        isError: true,
        timestamp: error.timestamp
    }]);
}

export function removeNotification(timestamp, setNotifications) {
    setNotifications(prev => prev.filter(notification => notification.timestamp !== timestamp));
}