import "./styles.css";

import { createPortal } from "react-dom";

export default function SettingsDialog() {
    return createPortal(
        <dialog open className="full-screen-div">
            <div className="settings-dialog">
                <div className="relative-div">
                    <button className="header-localization"></button>
                    <button type="button" className="dialog-close">
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
                    <ul className="settings-ul">
                        <li>
                            <button className="settings-role-btn">Pause</button>
                        </li>
                        <li>
                            <button className="settings-role-btn">Rules</button>
                        </li>
                        <li>
                            <div class="volume-slider-container">
                                <label for="volumeSlider">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="volumeSlider-svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                        />
                                    </svg>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value="50"
                                    class="volume-slider"
                                    id="volumeSlider"
                                ></input>
                            </div>
                        </li>
                        <li>
                            <button className="settings-role-btn">
                                Terminate game
                            </button>
                        </li>
                        <li>
                            <button className="settings-role-btn">
                                Your massages
                            </button>
                        </li>
                        <li>
                            <button className="settings-role-btn">
                                Game settings
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </dialog>,
        document.getElementById("modal")
    );
}
