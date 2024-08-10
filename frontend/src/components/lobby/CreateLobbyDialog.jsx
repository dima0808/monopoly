import './styles.css';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function CreateLobbyDialog({ isOpen, onClose, onCreate }) {
    const lobbyNameRef = useRef();
    const lobbySizeRef = useRef();
    const lobbyPasswordRef = useRef();
    const [isPrivate, setIsPrivate] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const lobbyName = lobbyNameRef.current.value;
        const lobbySize = lobbySizeRef.current.value;
        const lobbyPassword = isPrivate ? lobbyPasswordRef.current.value : null;
        onCreate({ name: lobbyName, size: lobbySize, password: lobbyPassword });
        onClose();
    };

    const handlePrivateChange = () => {
        setIsPrivate(!isPrivate);
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        } else {
            document.removeEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <dialog open className="lobby-dialog">
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input type="text" ref={lobbyNameRef} required />
                </label>
                <label>
                    Size:
                    <input type="number" ref={lobbySizeRef} required />
                </label>
                <div className="private-lobby-settings">
                    <label>
                        Password:
                        <input type="password" ref={lobbyPasswordRef} disabled={!isPrivate}/>
                    </label>
                    <label>
                        <input type="checkbox" checked={isPrivate} onChange={handlePrivateChange}/>
                    </label>
                </div>
                <button type="submit">Create</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}