import "./styles.css";
import rankIron from "../../images/Rank_Iron.png";
import viewImg from "../../images/view-icon.png";
import { useEffect, useState } from "react";
import { getRoomByUsername } from "../../utils/http";
import { Link } from "react-router-dom";

export default function ProfileStats({
    user,
    setIsPrivateChatOpen,
    setSelectedUser,
}) {
    const [inGame, setInGame] = useState(null);
    const [error, setError] = useState(null);

    function writeMessage() {
        setIsPrivateChatOpen(true);
        setSelectedUser();
    }

    useEffect(() => {
        if (user && user.username) {
            getRoomByUsername(user.username)
                .then(setInGame)
                .catch((error) =>
                    setError({ message: error.message || "An error occurred" })
                );
        }
    }, [user]);

    return (
        <div className="profile-right-top">
            <div className="profile-right-top-flex">
                <div className="profile-statuses">
                    <h1 className="profile-right-top-h1">{user.nickname}</h1>
                    {inGame != null && inGame.isStarted === true && !error && (
                        <div className="in-game-div">
                            <p className="in-game-p">In game</p>
                            <Link
                                to={`/game/${inGame.name}`}
                                className="view-img-btn"
                            >
                                <img
                                    src={viewImg}
                                    alt="viewImg"
                                    className="view-img"
                                />
                            </Link>
                        </div>
                    )}
                    {error && <p className="error-message">{error.message}</p>}
                    <div className="flex-ranked">
                        <img
                            src={rankIron}
                            className="ranked-img"
                            alt="unkownImg"
                        />
                        <p className="flex-ranked-p">{user.elo}</p>
                    </div>
                </div>

                <div className="profile-right-top-flex-btns">
                    <button
                        onClick={writeMessage}
                        className="update-profile-btn profile-btn"
                    >
                        Write a Message
                    </button>
                    <div className="profile-right-top-btns">
                        <div className="profile-statistic">
                            <p className="profile-statistic-circle">
                                {user.matchesPlayed}
                            </p>
                            <p className="profile-statistic-p">Matches</p>
                        </div>
                        <div className="profile-statistic">
                            <p className="profile-statistic-circle">
                                {user.matchesWon}
                            </p>
                            <p className="profile-statistic-p">Wins</p>
                        </div>
                        <div className="profile-statistic">
                            <p className="profile-statistic-circle">
                                {user.averagePlacement}
                            </p>
                            <p className="profile-statistic-p">Average</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
