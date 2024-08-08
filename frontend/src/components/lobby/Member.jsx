import './styles.css';

import avatarImg from "../../images/avatar.png";

export default function Member({ username, isLeader }) {
    return (
        <div className="lobby__member">
            <div className={`lobby__member-avatar ${isLeader ? 'leader' : ''}`}>
                <img
                    src={avatarImg}
                    className="lobby__member-avatar-img"
                    alt="avatar"
                /> {/*todo: add avatar*/}
            </div>
            <a className="lobby__member-nickname" href="#"> {username} </a> {/*todo: add profile link*/}
        </div>
    );
}