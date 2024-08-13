import "./styles.css";

import civkaLogoImg from "../../images/civka-logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({ username, onLogout }) {
  return (
    <header className="header">
      <div className="header-flex">
        <ul className="header__ul">
          <Link to="/" className="header__anchor-img">
            <img src={civkaLogoImg} alt="civ-logo" className="header-img" />
          </Link>
          <Link to="/rules" className="header__anchor">
            {" "}
            Правила{" "}
          </Link>
          <Link to="/admin" className="header__anchor">
            Адмін
          </Link>
        </ul>
        <ul className="header__ul">
          <button className="header-localization"></button>
          {username ? (
            <>
              <Link
                to={"/profile/" + username}
                className="header__anchor header__anchor-username"
              >
                {username}
              </Link>
              <Link
                onClick={() => {
                  onLogout(null);
                  Cookies.remove("token");
                  Cookies.remove("username");
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
            <Link to="/signin " className="header__anchor">
              Логін
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
