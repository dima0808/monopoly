import "./styles.css";

import civkaLogoImg from "../../images/civka-logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({ nickname, onLogout, setIsPrivateChatOpen, setSelectedUser }) {
  return (
    <header className="header">
      <div className="header-flex">
        <ul className="header__ul">
          <Link to={`/`} className="header__anchor-img">
            <img src={civkaLogoImg} alt="civ-logo" className="header-img" />
          </Link>
          <Link to={`/rules`} className="header__anchor">
            {" "}
            Rules{" "}
          </Link>
          {Cookies.get("role") === "ROLE_ADMIN" && (
            <Link to={`/admin`} className="header__anchor">
              Admin
            </Link>
          )}
        </ul>
        <ul className="header__ul">
          <button className="header-localization"></button>

          {nickname ? (
            <>
              <button onClick={() => {
                setSelectedUser(null);
                setIsPrivateChatOpen(true);
              }} className="private-chat-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="private-chat-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </button>
              <Link
                to={`/profile/${nickname}`}
                className="header__anchor header__anchor-username"
              >
                {nickname}
              </Link>
              <Link
                onClick={() => {
                  onLogout(null);
                  Cookies.remove("token");
                  Cookies.remove("username");
                  Cookies.remove("nickname");
                  Cookies.remove("role");
                  setIsPrivateChatOpen(false);
                }}
                to="/"
                className="header__anchor"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="header-svg-exit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </Link>
            </>
          ) : (
            <Link to={`/signin`} className="header__anchor">
              Login
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
