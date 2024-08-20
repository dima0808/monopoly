import "./styles.css";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function JoinLobbyDialog({ isOpen, onClose, onJoin }) {
  const passwordRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    onJoin(password);
    onClose();
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <dialog open className="full-screen-div">
      <div className="lobby-dialog lobby-dialog-join">
        <form onSubmit={handleFormSubmit}>
          <label>
            Password:
            <input
              type="password"
              ref={passwordRef}
              required
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className="dialog-submit">
            Join
          </button>
          <button type="button" onClick={onClose} className="dialog-close">
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
          </button>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
