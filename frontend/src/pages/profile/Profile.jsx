import "./styles.css";
import avatarImg from "../../images/avatar.png";
import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {getUser} from "../../utils/http";
import ProfileImage from "../../components/profile/ProfileImage";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileCredentials from "../../components/profile/ProfileCredentials";
import Achievements from "../../components/profile/Achievements";
import PrivateChatDialog from "../../components/chat/private/PrivateChatDialog";

export default function Profile({onUpdate, notifications, setNotifications, isPrivateChatOpen, setIsPrivateChatOpen}) {
    const {nickname} = useParams();
    const cookiesNickname = Cookies.get('nickname');
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    const isYourProfile = nickname === cookiesNickname;

    useEffect(() => {
        getUser(nickname).then(setUser)
            .catch((error) => setError({message: error.message || "An error occurred"}));
    }, [nickname]);

    return (
        <main>
            <PrivateChatDialog notifications={notifications}
                               setNotifications={setNotifications}
                               isOpen={isPrivateChatOpen} onClose={() => setIsPrivateChatOpen(false)}/>
            <div className={"gradiant-violet profile " + (isYourProfile ? "your-profile" : "")}>
                {error && <p className="error-message">{error.message}</p>}
                <div className="section profile-grid">
                    <ProfileImage src={avatarImg} />
                    <ProfileStats user={user} setIsPrivateChatOpen={setIsPrivateChatOpen} />
                    {isYourProfile && <ProfileCredentials user={user} onUpdate={onUpdate} />}
                    <Achievements />
                </div>
            </div>
        </main>
    );
}
