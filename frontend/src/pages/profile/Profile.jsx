import "./styles.css";
import avatarImg from "../../images/avatar.png";
import unknownImg from "../../images/unknown.png";
import React from "react";

import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();

  return (
    <main>
      <div className="gradiant-violet profile  ">
        <div className="section profile-grid">
          <div className="profile-left-top">
            <div className="violete-square">
              <img
                src={avatarImg}
                className="profile-left-top-img"
                alt="avatarImg"
              />
              <button className="profile-left-top-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="profile-left-top-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="profile-right-top">
            <div className="profile-right-top-flex">
              <div className="profile-statuses">
                <h1 className="profile-right-top-h1">TNTeshka</h1>
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
                  <p className="flex-ranked-p">1300</p>
                </div>
              </div>
              <div className="profile-right-top-flex-btns">
                <button className="update-profile-btn profile-btn">
                  Write a Message
                </button>
                <div className="profile-right-top-btns">
                  <div className="profile-statictic">
                    <p className="profile-statictic-sircle">123</p>
                    <p className="profile-statictic-p">Matches</p>
                  </div>
                  <div className="profile-statictic">
                    <p className="profile-statictic-sircle">8</p>
                    <p className="profile-statictic-p">Wins</p>
                  </div>
                  <div className="profile-statictic">
                    <p className="profile-statictic-sircle">4.25</p>
                    <p className="profile-statictic-p">Average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-left-bottom">
            <label className="profile-label">
              Your Nickname:
              <input
                type="text"
                className="profile-input"
                required
                autoComplete="new-password"
              />
            </label>
            <label className="profile-label">
              E-mail:
              <input
                type="text"
                className="profile-input"
                required
                autoComplete="new-password"
              />
            </label>
            <label className="profile-label">
              Change Password:
              <input
                type="password"
                className="profile-input"
                required
                autoComplete="new-password"
              />
            </label>
            <label className="profile-label">
              Repeat the Password:
              <input
                type="password"
                className="profile-input"
                required
                autoComplete="new-password"
              />
            </label>
            <div className="flex-between">
              {" "}
              <button className="reverse-btn profile-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="reverse-btn-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
              <button className="update-profile-btn profile-btn">
                Update profile
              </button>
            </div>
          </div>
          <div className="profile-right-bottom">
            <p className="profile-right-bottom-p">Achievements 12/24</p>

            <div className="profile-right-bottom-div scroll"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
