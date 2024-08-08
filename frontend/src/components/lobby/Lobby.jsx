import './styles.css';

import React from 'react';
import plusImg from "../../images/plus.png";

export default function Lobby({ name, size, children }) {
    const remainingSlots = size - React.Children.count(children);

    return (
        <div className="lobby__room">
            <div className="lobby__header">
                <button className="lobby__name">{name}</button>
            </div>
            <div className="lobby__members">
                {children}
                {Array.from({ length: remainingSlots }).map((_, index) => (
                    <div className="lobby__member" key={index}>
                        <button className="lobby__member-avatar lobby__member-btn">
                            <img
                                src={plusImg}
                                className="lobby__member-avatar-img"
                                alt="avatar"
                            />
                        </button>
                    </div>
                ))}
            </div>
            <div className="in-room-btns">
                <button className="leave-btn btn-in">leave</button>
                <button className="move-to-lobby-btn btn-in">Move to Lobby</button>
            </div>
        </div>
    );
}