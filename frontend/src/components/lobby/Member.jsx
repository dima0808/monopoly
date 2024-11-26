import './styles.css';

import avatarImg from "../../images/avatar.png";
import {Link} from "react-router-dom";

export default function Member({ username, nickname, isLeader, onKick, showKickButton }) {
    return (
        <div className="lobby__member">
            <div className={`lobby__member-avatar ${isLeader ? 'leader' : ''}`}>
                <img
                    src={avatarImg}
                    className="lobby__member-avatar-img"
                    alt="avatar"
                /> {/*todo: add avatar*/}
            </div>
            <Link to={`/profile/${nickname}`} className="lobby__member-nickname">{nickname}</Link>
            {showKickButton && (
                <button onClick={() => onKick(username)} className="kick-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="kick-svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}