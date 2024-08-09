import './styles.css';
import React, {useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';

export default function CreateLobbyDialog({ isOpen, onClose, onCreate }) {
    const lobbyNameRef = useRef();
    const lobbySizeRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const lobbyName = lobbyNameRef.current.value;
        const lobbySize = lobbySizeRef.current.value;
        onCreate({ name: lobbyName, size: lobbySize });
        onClose();
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
                    Lobby Name:
                    <input type="text" ref={lobbyNameRef} required />
                </label>
                <label>
                    Lobby Size:
                    <input type="number" ref={lobbySizeRef} required />
                </label>
                <button type="submit">Create</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}