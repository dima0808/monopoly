import "./styles.css";
import { useRef, useState } from "react";
import { signUp } from "../../utils/http";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }

    try {
      await signUp({ username, email, password });
      setError(null);
      navigate("/signin");
    } catch (error) {
      setError({ message: error.message || "An error occurred" });
    }
  };

  const handleInputChange = () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    setIsDisabled(!(username && password && email && confirmPassword));
  };

  return (
    <main>
      <div className="authentication-section-fon gradiant-violet">
        <div className="authentication-section">
          <h1 className="authentication-h1">Sign Up</h1>
          <form onSubmit={handleSubmit} className="authentication-form">
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              className="authentication-input"
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="authentication-input"
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="authentication-input"
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              className="authentication-input"
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            {error && <p className="error-message"> {error.message}</p>}
            <button
                type="submit"
                className={`authentication-btn ${!isDisabled ? "continue-button " : ""}`}
                disabled={isDisabled}
            >
              🠚
            </button>

            <Link to={"/signin"} className="authentication-link">
              Already have an account? Sign In
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
