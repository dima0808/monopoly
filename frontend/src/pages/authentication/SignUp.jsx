import "./styles.css";
import { useRef, useState } from "react";
import { signUp } from "../../http";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);
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
      alert("User created successfully");
      navigate("/signin");
    } catch (error) {
      setError({ message: error.message || "An error occurred" });
    }
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
            />
            <input
              type="text"
              placeholder="Email"
              ref={emailRef}
              className="authentication-input"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="authentication-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              className="authentication-input"
            />
            {error && <p className="error-message"> {error.message}</p>}
            <button type="submit" className="authentication-btn">
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
