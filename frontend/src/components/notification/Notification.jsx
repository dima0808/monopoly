import './styles.css';
import React, { useState, useEffect, useRef } from 'react';

export default function Notification({ message, duration, isError, style, onClose }) {
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
            <div className="notification">{message}</div>
            <div className="progressBar" ref={progressBarRef}></div>
        </div>
    );
}