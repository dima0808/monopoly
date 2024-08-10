import './styles.css';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

export default function JoinLobbyDialog({ isOpen, onClose, onJoin }) {
    const passwordRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        onJoin(password);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <dialog open className="lobby-dialog">
            <form onSubmit={handleFormSubmit}>
                <label>
                    Password:
                    <input type="password" ref={passwordRef} required />
                </label>
                <button type="submit">Join</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}