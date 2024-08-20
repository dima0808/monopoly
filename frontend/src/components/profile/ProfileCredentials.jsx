import './styles.css'
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../utils/http";
import Cookies from "js-cookie";

export default function ProfileCredentials({ user: { nickname, email }, onUpdate, setNotifications }) {
    const newNicknameRef = useRef(nickname);
    const newEmailRef = useRef(email);
    const newPasswordRef = useRef("");
    const repeatPasswordRef = useRef("");
    const [error, setError] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const newNicknameInput = newNicknameRef.current;
        const newEmailInput = newEmailRef.current;
        const newPasswordInput = newPasswordRef.current;
        const repeatPasswordInput = repeatPasswordRef.current;

        function checkChanges() {
            setError(null);
            const newNickname = newNicknameInput.value;
            const newEmail = newEmailInput.value;
            const newPassword = newPasswordInput.value;
            const repeatPassword = repeatPasswordInput.value;

            if (
                newNickname !== nickname ||
                newEmail !== email ||
                newPassword !== "" ||
                repeatPassword !== ""
            ) {
                setIsChanged(true);
            } else {
                setIsChanged(false);
            }
        }

        newNicknameInput.addEventListener("input", checkChanges);
        newEmailInput.addEventListener("input", checkChanges);
        newPasswordInput.addEventListener("input", checkChanges);
        repeatPasswordInput.addEventListener("input", checkChanges);

        return () => {
            newNicknameInput.removeEventListener("input", checkChanges);
            newEmailInput.removeEventListener("input", checkChanges);
            newPasswordInput.removeEventListener("input", checkChanges);
            repeatPasswordInput.removeEventListener("input", checkChanges);
        };
    }, [nickname, email]);

    async function handleUpdateProfile() {
        const newNickname = newNicknameRef.current.value;
        const newEmail = newEmailRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const repeatPassword = repeatPasswordRef.current.value;

        if (newPassword !== repeatPassword) {
            setError({ message: "Passwords do not match" });
            return;
        }

        const updatedFields = {};
        if (newNickname !== nickname) updatedFields.nickname = newNickname;
        if (newEmail !== email) updatedFields.email = newEmail;
        if (newPassword !== "") updatedFields.password = newPassword;

        try {
            const token = Cookies.get("token");
            await updateProfile(updatedFields, token);
            if (newNickname !== nickname) {
                navigate(`/profile/${newNickname}`);
                Cookies.set("nickname", newNickname);
                onUpdate(newNickname);
            }
            newPasswordRef.current.value = "";
            repeatPasswordRef.current.value = "";
            setNotifications(prev => [...prev, {
                message: "Profile updated",
                type: "UPDATE_PROFILE",
                duration: 3500,
                isError: false,
                timestamp: Date.now()
            }]);
            setIsChanged(false);
        } catch (error) {
            setError({ message: error.message || "An error occurred" });
        }
    }

    function handleReset() {
        newNicknameRef.current.value = nickname;
        newEmailRef.current.value = email;
        newPasswordRef.current.value = "";
        repeatPasswordRef.current.value = "";
        setIsChanged(false);
        setError(null);
    }

    return (
        <div className="profile-left-bottom">
            <label className="profile-label">
                Nickname:
                <input
                    type="text"
                    className="profile-input"
                    defaultValue={nickname}
                    ref={newNicknameRef}
                    required
                    autoComplete="new-password"
                />
            </label>
            <label className="profile-label">
                E-mail:
                <input
                    type="email"
                    className="profile-input"
                    defaultValue={email}
                    ref={newEmailRef}
                    required
                    autoComplete="new-password"
                />
            </label>
            <label className="profile-label">
                Change Password:
                <input
                    type="password"
                    className="profile-input"
                    ref={newPasswordRef}
                    required
                    autoComplete="new-password"
                />
            </label>
            <label className="profile-label">
                Repeat the Password:
                <input
                    type="password"
                    className="profile-input"
                    ref={repeatPasswordRef}
                    required
                    autoComplete="new-password"
                />
            </label>
            {error && <p className="error-message">{error.message}</p>}
            <div className="flex-between">
                <button
                    className="reverse-btn profile-btn"
                    onClick={handleReset}
                    disabled={!isChanged}
                >
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
                <button
                    className="update-profile-btn profile-btn"
                    onClick={handleUpdateProfile}
                    disabled={!isChanged}
                >
                    Update profile
                </button>
            </div>
        </div>
    );
}