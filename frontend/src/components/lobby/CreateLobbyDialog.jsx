import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CreateLobbyDialog({ isOpen, onClose, onCreate }) {
  const lobbyNameRef = useRef();
  const lobbyPasswordRef = useRef();
  const [isPrivate, setIsPrivate] = useState(false);
  const [lobbySize, setLobbySize] = useState(4);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const lobbyName = lobbyNameRef.current.value;
    const lobbyPassword = isPrivate ? lobbyPasswordRef.current.value : null;
    onCreate({ name: lobbyName, size: lobbySize, password: lobbyPassword });
    onClose();
  };

  const handlePrivateChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleSizeChange = (e) => {
    setLobbySize(parseInt(e.target.value, 10));
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
      <div className="lobby-dialog">
        <form onSubmit={handleFormSubmit}>
          <label className="lobby-label">
            Lobby Name:
            <input
              type="text"
              ref={lobbyNameRef}
              className="lobby-input"
              required
              autoComplete="new-password"
            />
          </label>
          Size (2-6):
          <div className="radio-buttons" onChange={handleSizeChange}>
            <input type="radio" id="size2" name="size" value={2} />
            <label htmlFor="size2">2</label>

            <input type="radio" id="size3" name="size" value={3} />
            <label htmlFor="size3">3</label>

            <input
              type="radio"
              id="size4"
              name="size"
              value={4}
              defaultChecked
            />
            <label htmlFor="size4">4</label>

            <input type="radio" id="size5" name="size" value={5} />
            <label htmlFor="size5">5</label>

            <input type="radio" id="size6" name="size" value={6} />
            <label htmlFor="size6">6</label>
          </div>
          <div className="private-lobby-settings">
            <div className="flex-between">
              <label className="lobby-label" htmlFor="input-password">
                Password:
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={handlePrivateChange}
                />
                <span className="slider"></span>
              </label>
            </div>
            <input
              id="input-password"
              type="password"
              ref={lobbyPasswordRef}
              disabled={!isPrivate}
              className={
                "lobby-input " + (!isPrivate ? "lobby-input-disabled" : "")
              }
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="dialog-submit">
            Create
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
