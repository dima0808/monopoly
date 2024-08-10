import './styles.css';
import React from 'react';
import plusImg from "../../images/plus.png";
import {Link} from "react-router-dom";
import Member from "./Member";
import Cookies from "js-cookie";

export default function Lobby({name, size, onJoin, onLeave, onKick, onDelete, room}) {
    const remainingSlots = size - room.members.length;
    const username = Cookies.get('username');

    function isUserInRoom() {
        return room.members.some(member => member.user.username === username);
    }

    function isUserLeader() {
        return room.members.some(member => member.user.username === username && member.isLeader);
    }

    return (
        <div className="lobby__room">
            <div className="lobby__header">
                <button className="lobby__name">{name}</button>
            </div>
            <div className="lobby__members">
                {room.members.map((member, index) => (
                    <Member key={index}
                            username={member.user.username}
                            isLeader={member.isLeader}
                            onKick={onKick}
                            showKickButton={isUserLeader() && !member.isLeader}/>
                ))}
                {Array.from({length: remainingSlots}).map((_, index) => (
                    <div className="lobby__member" key={index}>
                        <button onClick={onJoin} className="lobby__member-avatar lobby__member-btn"
                                disabled={isUserInRoom()}>
                            <img
                                src={plusImg}
                                className="lobby__member-avatar-img"
                                alt="avatar"
                            />
                        </button>
                    </div>
                ))}
            </div>
            {isUserInRoom() && (
                <div className="in-room-btns">
                    <div>
                        <button onClick={onLeave} className="leave-btn btn-in">leave</button>
                        {isUserLeader() && <button onClick={onDelete} className="leave-btn btn-in">delete room</button>}
                    </div>
                    <Link to="/game" className="move-to-lobby-btn btn-in">Move to Lobby</Link>
                </div>
            )}
        </div>
    );
}