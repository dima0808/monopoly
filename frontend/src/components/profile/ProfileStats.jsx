import './styles.css';
import unknownImg from "../../images/unknown.png";
import React from "react";

export default function ProfileStats({ user : {nickname, elo, matchesPlayed, matchesWon, averagePlacement} }) {

    return (
        <div className="profile-right-top">
            <div className="profile-right-top-flex">
                <div className="profile-statuses">
                    <h1 className="profile-right-top-h1">{nickname}</h1>
                    <div className="flex-ranked">
                        <p className="flex-ranked-p">Status:</p>
                        <p className="flex-ranked-p">online</p>
                        <div className="flex-ranked-div"></div>
                    </div>
                    <div className="flex-ranked">
                        <img
                            src={unknownImg}
                            className="ranked-img"
                            alt="unkownImg"
                        />
                        <p className="flex-ranked-p">{elo}</p>
                    </div>
                </div>
                <div className="profile-right-top-flex-btns">
                    <button className="update-profile-btn profile-btn">
                        Write a Message
                    </button>
                    <div className="profile-right-top-btns">
                        <div className="profile-statistic">
                            <p className="profile-statistic-circle">{matchesPlayed}</p>
                            <p className="profile-statistic-p">Matches</p>
                        </div>
                        <div className="profile-statistic">
                            <p className="profile-statistic-circle">{matchesWon}</p>
                            <p className="profile-statistic-p">Wins</p>
                        </div>
                        <div className="profile-statistic">
                            <p className="profile-statistic-circle">{averagePlacement}</p>
                            <p className="profile-statistic-p">Average</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}