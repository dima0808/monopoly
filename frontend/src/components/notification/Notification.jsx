import './styles.css';
import React, { useState, useEffect, useRef } from 'react';

export default function Notification({ sender = null, message, duration, isError, style, onClose, openChat }) {
    const [visible, setVisible] = useState(false);
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const progressBar = progressBarRef.current;
            progressBar.style.width = '0';
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.getBoundingClientRect();
            progressBar.style.width = '100%';

            const timer = setTimeout(() => {
                setVisible(false);
                progressBar.style.width = '0';
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    return (
        <div style={style} className={`notification-container ${isError ? 'error' : ''} ${visible ? 'show' : ''}`}>
            {sender && <div onClick={openChat} className="notification"><b>{sender}: </b>{message}</div>}
            {!sender && <div className="notification">{message}</div>}
            <div className="progressBar" ref={progressBarRef}></div>
        </div>
    );
}