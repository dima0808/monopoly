import {useRef, useState, useEffect} from "react";
import {signIn} from "../../utils/http";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";
import "./styles.css";

export default function SignIn({onLogin}) {
    const loginRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;
        setIsDisabled(!(login && password));
    }, []);

    const handleInputChange = () => {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;
        setIsDisabled(!(login && password));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        try {
            const { token, username, nickname, role } = await signIn({login, password});
            setError(null);
            Cookies.set("token", token);
            Cookies.set("username", username);
            Cookies.set("nickname", nickname);
            Cookies.set("role", role);
            onLogin(nickname);
            navigate("/");
        } catch (error) {
            setError({message: error.message || "An error occurred"});
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
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className="authentication-input"
                            onChange={handleInputChange}
                        />
                        {error && <p className="error-message">{error.message}</p>}

                        <button
                            type="submit"
                            className={`authentication-btn ${!isDisabled ? "continue-button " : ""}`}
                            disabled={isDisabled}
                        >
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