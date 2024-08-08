import { useRef, useState } from 'react';
import { signUp } from "../../http";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
            setError({ message: 'Passwords do not match' });
            return;
        }

        try {
            await signUp({ username, email, password });
            setError(null);
            alert('User created successfully');
            navigate('/signin');
        } catch (error) {
            setError({ message: error.message || 'An error occurred' });
        }
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    ref={usernameRef}
                />
                <input
                    type="text"
                    placeholder="Email"
                    ref={emailRef}
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                />
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                <button type="submit">Sign Up</button>
                <Link to={'/signin'}>Already have an account? Sign In</Link>
            </form>
        </main>
    );
}