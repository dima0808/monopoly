import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import "./styles.css";
import randomImg from "../../../images/unknown.png";
import colombiaImg from "../../../images/colombia-leader.png";
import egyptImg from "../../../images/egypt-leader.png";
import germanyImg from "../../../images/germany-leader.png";
import japanImg from "../../../images/japan-leader.png";
import koreaImg from "../../../images/korea-leader.png";
import romeImg from "../../../images/rome-leader.png";
import swedenImg from "../../../images/sweden-leader.png";
import goldImg from "../../../images/icon-gold.png";
import tourismImg from "../../../images/icon-tourism.png";
import strengthImg from "../../../images/icon-strength.png";
import centerImg from "../../../images/icon-city-center.png";

const civs = [
  "Random",
  "Colombia",
  "Egypt",
  "Germany",
  "Japan",
  "Korea",
  "Rome",
  "Sweden",
];

export default function Player({
  player,
  onCivChange,
  availableCivs,
  onColorChange,
  availableColors,
  isStarted,
  onKick,
  showKickButton,
  isCurrentUserTurn,
  hasRolledDice,
}) {
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isCivDropdownOpen, setIsCivDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const civDropdownRef = useRef(null);

  const rollDiceMs = localStorage.getItem('diceRollTimer') || 5000;
  const rollDiceDuration = Math.floor(rollDiceMs / 1000) + 's';
  const rollDiceProgress = Math.floor((1 - rollDiceMs / 5000) * (-189));
  const endTurnMs = localStorage.getItem('endTurnTimer') || 90000;
  const endTurnDuration = Math.floor(endTurnMs / 1000) + 's';
  const endTurnProgress = Math.floor((1 - endTurnMs / 90000) * (-189));

  const leaderImages = {
    Random: randomImg,
    Colombia: colombiaImg,
    Egypt: egyptImg,
    Germany: germanyImg,
    Japan: japanImg,
    Korea: koreaImg,
    Rome: romeImg,
    Sweden: swedenImg,
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
    if (event.key === "Escape") {
      setIsColorDropdownOpen(false);
      setIsCivDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
      <div className={"player color-" + player.color + (player.isLost ? " dead-color" : "")}>
        <div className={"player__div" + (player.isLeader ? " leader" : "")}>
          <img
              src={leaderImages[player.civilization]}
              className="player__div-img"
              alt="avatar"
          />
          {(isCurrentUserTurn && !hasRolledDice) && (
              <div className="timer-roll-dice"
                   style={{ '--roll-dice-duration': rollDiceDuration, '--roll-dice-progress': rollDiceProgress }}>
                <svg width="65" height="65">
                  <circle cx="32.5" cy="32.5" r="30"/>
                </svg>
              </div>
          )}
          {(isCurrentUserTurn && hasRolledDice) && (
              <div className="timer-end-turn"
                   style={{ '--end-turn-duration': endTurnDuration, '--end-turn-progress': endTurnProgress }}>
                <svg width="65" height="65">
                  <circle cx="32.5" cy="32.5" r="30"/>
                </svg>
              </div>
          )}
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

          {isStarted && (
              <div className="player-stats-grid">
                <div className="player-stat-gold no-select">
                  <img src={goldImg} className="recourse-img" alt="gold"/>
                  {player.gold}
                </div>
                <div className="player-stat-strength no-select">
                  <img
                      src={strengthImg}
                      className="recourse-img strength-recourse-img"
                      alt="strength"
                  />
                  {player.strength}
                </div>
                <div className="player-stat-tourism no-select">
                  <img src={tourismImg} className="recourse-img" alt="tourism"/>
                  {player.tourism}
                </div>
                <div className="player-stat-score no-select">
                  <img src={centerImg} className="recourse-img" alt="score"/>
                  {player.score}
                </div>
              </div>
          )}

          {!isStarted && (
              <div className="player-stats-grid">
                <div className="civ-selector" ref={civDropdownRef}>
                  <button
                      className="civ-button"
                      disabled={Cookies.get("username") !== player.user.username}
                      onClick={() => setIsCivDropdownOpen((prevState) => !prevState)}
                  >
                    {player.civilization}
                  </button>
                  {isCivDropdownOpen && (
                      <div className="civ-dropdown">
                        {civs.map((civ) => (
                            <div
                                key={civ}
                                className={`civ-option ${
                                    availableCivs.includes(civ) ? "selected" : "unselected"
                                }`}
                                onClick={() =>
                                    availableCivs.includes(civ) && handleCivChange(civ)
                                }
                            >
                              {civ}
                            </div>
                        ))}
                      </div>
                  )}
                </div>

                <div className="color-selector" ref={dropdownRef}>
                  {Cookies.get("username") === player.user.username && (
                      <button
                          className={"color-button color-" + player.color}
                          onClick={() =>
                              setIsColorDropdownOpen((prevState) => !prevState)
                          }
                      />
                  )}
                  {isColorDropdownOpen && (
                      <div className="color-dropdown">
                        {availableColors.map((color) => (
                            <div
                                key={color}
                                className={"color-option color-" + color}
                                onClick={() => handleColorChange(color)}
                            />
                        ))}
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
      </div>
  );
}