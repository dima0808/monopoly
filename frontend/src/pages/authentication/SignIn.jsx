import "./styles.css";
import { useRef, useState } from "react";

import { signIn } from "../../http";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function SignIn({ onLogin }) {
  const loginRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = loginRef.current.value;
    const password = passwordRef.current.value;

    try {
      const resData = await signIn({ login, password });
      setError(null);
      Cookies.set("token", resData.token);
      Cookies.set("username", resData.username);
      onLogin(resData.username);
      alert("User logged in successfully");
    } catch (error) {
      setError({ message: error.message || "An error occurred" });
    }
  };

  return (
    <main>
      <div className="authentication-section-fon gradiant-violet">
        <div className="authentication-section">
          <h1 className="authentication-h1">Sign In</h1>
          <form onSubmit={handleSubmit} className="authentication-form">
            <input
              type="text"
              placeholder="Login"
              ref={loginRef}
              className="authentication-input"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="authentication-input"
            />
            {error && <p className="error-message">{error.message}</p>}

            <button type="submit" className="authentication-btn">
              🠚
            </button>
            <Link to={"/signup"} className="authentication-link">
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
