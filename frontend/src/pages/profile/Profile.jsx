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

export default function Profile({onUpdate, setIsPrivateChatOpen, setSelectedUser}) {
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
            <div className={"gradiant-violet profile " + (isYourProfile ? "your-profile" : "")}>
                {error && <p className="error-message">{error.message}</p>}
                <div className="section profile-grid">
                    <ProfileImage src={avatarImg}/>
                    <ProfileStats user={user}
                                  setIsPrivateChatOpen={setIsPrivateChatOpen}
                                  setSelectedUser={() => setSelectedUser(user)}/>
                    {isYourProfile && <ProfileCredentials user={user} onUpdate={onUpdate}/>}
                    <Achievements/>
                </div>
            </div>
        </main>
    );
}
