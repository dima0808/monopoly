import "./styles.css";
import unknownImg from "../../images/unknown.png";
import viewImg from "../../images/view-icon.png";
import React from "react";

export default function ProfileStats({
  user: { nickname, elo, matchesPlayed, matchesWon, averagePlacement },
  setIsPrivateChatOpen,
  setSelectedUser,
}) {
  function writeMessage() {
    setIsPrivateChatOpen(true);
    setSelectedUser();
  }

  return (
    <div className="profile-right-top">
      <div className="profile-right-top-flex">
        <div className="profile-statuses">
          <h1 className="profile-right-top-h1">{nickname}</h1>

          {/* <div className="flex-ranked">
            <div className="flex-ranked-div"></div>
          </div> */}
          <div className="in-game-div">
            <p className="in-game-p">In game</p>
            <button className="view-img-btn">
              <img src={viewImg} alt="viewImg" className="view-img" />
            </button>
          </div>
          <div className="flex-ranked">
            <img src={unknownImg} className="ranked-img" alt="unkownImg" />
            <p className="flex-ranked-p">{elo}</p>
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
