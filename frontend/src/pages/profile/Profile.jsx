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
import NotFound from "../errorPages/NotFound";

export default function Profile({onUpdate, setIsPrivateChatOpen, setSelectedUser, setNotifications}) {
    const {nickname} = useParams();
    const cookiesNickname = Cookies.get('nickname');
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);

    const isYourProfile = nickname === cookiesNickname;

    useEffect(() => {
        getUser(nickname).then((user) => {
            setUser(user);
            setUserNotFound(false);
        }).catch((error) => {
            setError({message: error.message || "An error occurred"});
            setUserNotFound(true);
        });
    }, [nickname]);

    if (userNotFound) {
        return <NotFound message={"User with nickname '" + nickname + "' not found"} />;
    }

    return (
        <main>
            <div className={"gradiant-violet profile " + (isYourProfile ? "your-profile" : "")}>
                {error && <p className="error-message">{error.message}</p>}
                <div className="section profile-grid">
                    <ProfileImage src={avatarImg}/>
                    <ProfileStats user={user}
                                  setIsPrivateChatOpen={setIsPrivateChatOpen}
                                  setSelectedUser={() => setSelectedUser(isYourProfile ? null : user)}/>
                    {isYourProfile && <ProfileCredentials user={user} onUpdate={onUpdate} setNotifications={setNotifications}/>}
                    <Achievements/>
                </div>
            </div>
        </main>
    );
}