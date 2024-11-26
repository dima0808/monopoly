import "./styles.css";
import React from "react";
import plusImg from "../../images/plus.png";
import viewImg from "../../images/view-icon.png";
import {Link} from "react-router-dom";
import Member from "./Member";
import {isUserInRoomCookies, isUserLeaderCookies} from "../../utils/lobby";

export default function Lobby({onJoin, onLeave, onKick, onDelete, room}) {
    const remainingSlots = room.size - room.members.length;

    return (
        <div className={"lobby__room" + (room.isStarted ? " game-started" : "")}>
            <div className="lobby__header">
                <button className="lobby__name">{room.name}</button>
                {room.isStarted && <div className="in-game-div">
                    <p className="in-game-p">Game started</p>
                    <Link to={`/game/${room.name}`} className="view-img-btn">
                        <img src={viewImg} alt="viewImg" className="view-img"/>
                    </Link>
                </div>}
            </div>
            <div className="lobby__members">
                {room.members.map((member, index) => (
                    <Member
                        key={index}
                        username={member.user.username}
                        nickname={member.user.nickname}
                        isLeader={member.isLeader}
                        onKick={onKick}
                        showKickButton={!room.isStarted && isUserLeaderCookies(room.members) && !member.isLeader}
                    />
                ))}
                {!room.isStarted && Array.from({length: remainingSlots}).map((_, index) => (
                    <div className="lobby__member" key={index}>
                        <button
                            onClick={onJoin}
                            className="lobby__member-avatar lobby__member-btn"
                            disabled={isUserInRoomCookies(room.members)}
                        >
                            <img
                                src={plusImg}
                                className="lobby__member-avatar-img"
                                alt="avatar"
                            />
                        </button>
                    </div>
                ))}
            </div>
            {isUserInRoomCookies(room.members) && (
                <div className="in-room-btns">
                    {<div> {/* !room.isStarted && */}
                        <button onClick={onLeave} className="leave-btn btn-in">
                            leave
                        </button>
                        {isUserLeaderCookies(room.members) && (
                            <button onClick={onDelete} className="leave-btn btn-in">
                                delete room
                            </button>
                        )}
                    </div>}
                    <div></div>
                    <Link
                        to={`/game/${room.name}`}
                        className="move-to-lobby-btn btn-in no-select"
                    >
                        Move to Lobby
                    </Link>
                </div>
            )}
        </div>
    );
}
