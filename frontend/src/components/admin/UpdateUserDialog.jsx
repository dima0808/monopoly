import "./styles.css";
import { createPortal } from "react-dom";
import avatarImg from "../../images/avatar.png";

export default function UpdateUserDialog() {
  return createPortal(
    <dialog open className=" full-screen-div ">
      <div className=" update-user-dialog your-profile">
        <div className="violet-square admin-violet-square">
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
        <div className="report-buttons">
          <div className="flex-between">
            <button className="update-profile-btn profile-btn sett-avatar his-messages">
              Delete the avatar
            </button>
            <button className="update-profile-btn profile-btn his-messages">
              His messages
            </button>
          </div>
          <div className="admin-red-flag">
            <label className="profile-label">
              <input
                type="text"
                className="profile-input"
                required
                autoComplete="new-password"
                placeholder="Ban Time"
              />
            </label>
            <label className="profile-label">
              <textarea
                className="chat__typing-input scroll profile-input"
                required
                autoComplete="new-password"
                placeholder="Ban Message"
              ></textarea>
            </label>
            <div className="flex-between admin-flex-between">
              <button className="update-profile-btn profile-btn his-messages">
                Ban Account
              </button>
              <button className="update-profile-btn profile-btn sett-avatar his-messages">
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className="admin-labels gradiant-violet-reverse">
          <div className="admin-flex-labels">
            <div className="admin-flex-labels-left">
              <label className="profile-label">
                Nickname:
                <input
                  type="text"
                  className="profile-input"
                  required
                  autoComplete="new-password"
                />
              </label>
              <label className="profile-label">
                Username:
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
                  type="email"
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
            </div>
            <div className="admin-flex-labels-right">
              <label className="profile-label">
                Elo:
                <input
                  type="number"
                  className="profile-input"
                  required
                  autoComplete="new-password"
                />
              </label>
              <label className="profile-label">
                Games:
                <input
                  type="number"
                  className="profile-input"
                  required
                  autoComplete="new-password"
                />
              </label>
              <label className="profile-label">
                Wins:
                <input
                  type="number"
                  className="profile-input"
                  required
                  autoComplete="new-password"
                />
              </label>
              <label className="profile-label">
                Average:
                <input
                  type="number"
                  className="profile-input"
                  required
                  autoComplete="new-password"
                />
              </label>
            </div>
          </div>
          <div className="admin-btns-flex-between flex-between">
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
        <buttwon type="button" className="dialog-close admin-dialog-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="kick-svg2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </buttwon>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
