import React, { useEffect, useRef, useState } from 'react';
import Cookies from "js-cookie";
import randomImg from "../../../images/unknown.png";
import colombiaImg from "../../../images/colombia-leader.png";
import egyptImg from "../../../images/egypt-leader.png";
import germanyImg from "../../../images/germany-leader.png";
import japanImg from "../../../images/japan-leader.png";
import koreaImg from "../../../images/korea-leader.png";
import romeImg from "../../../images/rome-leader.png";
import swedenImg from "../../../images/sweden-leader.png";

const civs = ["Random", "Colombia", "Egypt", "Germany", "Japan", "Korea", "Rome", "Sweden"];

export default function Player({ player, onCivChange, availableCivs, onColorChange, availableColors, isStarted, onKick, showKickButton }) {
    const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
    const [isCivDropdownOpen, setIsCivDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const civDropdownRef = useRef(null);

    const leaderImages = {
        "Random": randomImg,
        "Colombia": colombiaImg,
        "Egypt": egyptImg,
        "Germany": germanyImg,
        "Japan": japanImg,
        "Korea": koreaImg,
        "Rome": romeImg,
        "Sweden": swedenImg
    };

    const handleColorChange = (color) => {
        onColorChange(color);
        setIsColorDropdownOpen(false);
    };

    const handleCivChange = (civ) => {
        onCivChange(civ);
        setIsCivDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsColorDropdownOpen(false);
        }
        if (civDropdownRef.current && !civDropdownRef.current.contains(event.target)) {
            setIsCivDropdownOpen(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setIsColorDropdownOpen(false);
            setIsCivDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={"player color-" + player.color}>
            <div className={"player__div" + (player.isLeader ? " leader" : "")}>
                <img src={leaderImages[player.civilization]} className="player__div-img" alt="avatar"/>
                {showKickButton && (
                    <button onClick={onKick} className="kick-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="kick-svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="player__stats ">
                <h2 className="player__stats-h2">{player.user.nickname}</h2>

                {isStarted && <div className="player-stats-grid">
                    <div className="player-stat-gold">
                        <img src={randomImg} className="resurse-img" alt="avatar"/>
                        1234
                    </div>
                    <div className="player-stat-army">1234</div>
                    <div className="player-stat-tourism">1234</div>
                    <div className="player-stat-score">1234</div>
                </div>}

                {!isStarted && <div className="player-stats-grid">
                    <div className="civ-selector" ref={civDropdownRef}>
                        <button
                            className="civ-button"
                            disabled={Cookies.get('username') !== player.user.username}
                            onClick={() => setIsCivDropdownOpen((prevState) => !prevState)}
                        >
                            {player.civilization}
                        </button>
                        {isCivDropdownOpen && (
                            <div className="civ-dropdown">
                                {civs.map(civ => (
                                    <div
                                        key={civ}
                                        className={`civ-option ${availableCivs.includes(civ) ? 'selected' : 'unselected'}`}
                                        onClick={() => availableCivs.includes(civ) && handleCivChange(civ)}
                                    >
                                        {civ}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="color-selector" ref={dropdownRef}>
                        {(Cookies.get('username') === player.user.username) && <button
                            className={"color-button color-" + player.color}
                            onClick={() => setIsColorDropdownOpen((prevState) => !prevState)}
                        />}
                        {isColorDropdownOpen && (
                            <div className="color-dropdown">
                                {availableColors.map(color => (
                                    <div
                                        key={color}
                                        className={"color-option color-" + color}
                                        onClick={() => handleColorChange(color)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>}
            </div>

            {/*{showKickButton && (*/}
            {/*    <button onClick={onKick}>kick</button>*/}
            {/*)}*/}
        </div>
    );
}