import "./styles.css";
import victoryArmyImg from "../../../../../images/icon-victory-army.png";
import victoryCultureImg from "../../../../../images/icon-victory-culture.png";
import victoryScienceImg from "../../../../../images/icon-victory-science.png";
import victoryScoreImg from "../../../../../images/icon-victory-score.png";
import resourceHorsesImg from "../../../../../images/japan-leader.png";
import houseImg from "../../../../../images/icon-house.png";
import strengthImg from "../../../../../images/icon-strength.png";
import centerImg from "../../../../../images/icon-city-center.png";
import tourismImg from "../../../../../images/icon-tourism.png";
export default function Wins() {
    return (
        <div className="win">
            <div className="win__div">
                <div className="win__choose">
                    <img
                        src={victoryArmyImg}
                        className="win__img"
                        alt="victoryArmy"
                    />
                </div>
                <div className="win__choose win__chosen">
                    <img
                        src={victoryCultureImg}
                        className="win__img"
                        alt="victoryCulture"
                    />
                </div>
                <div className="win__choose ">
                    <img
                        src={victoryScienceImg}
                        className="win__img"
                        alt="victoryScience"
                    />
                </div>
                <div className="win__choose">
                    <img
                        src={victoryScoreImg}
                        className="win__img"
                        alt="victoryScore"
                    />
                </div>
            </div>
            <div className="win__victory">
                {/*--------------VICTORY ARMY----------------*/}
                <div className="win__victory-army">
                    <h2 className="win__victory-h2 ">Military Victory</h2>
                    <div className="victory-explain">
                        <div className="win__victory-background">
                            <div className="win__victory-background-color">
                                <img
                                    src={victoryArmyImg}
                                    className="win__img"
                                    alt="victoryArmy"
                                />
                            </div>
                        </div>

                        <p className="win__victory-p">
                            A victory is achieved either by military expansion
                            and a strong economy. You must controlling 80% of
                            the map (35 cells) or by being the last remaining
                            player.Become a true empire and strike fear into
                            your enemies!
                        </p>
                    </div>
                    <h3 className="win__victory-h2 win__victory-h3">
                        Top players:
                    </h3>
                    <div className="win__players-list">
                        <div className="not-civ-color color-red-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-house width-full half-height no-select">
                                            <img
                                                src={houseImg}
                                                className="recourse-img"
                                                alt="house"
                                            />
                                            10/35
                                        </div>
                                        <div className="player-stat-strength width-full half-height no-select">
                                            <img
                                                src={strengthImg}
                                                className="recourse-img strength-recourse-img"
                                                alt="strength"
                                            />
                                            1000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-blue-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-house width-full half-height no-select">
                                            <img
                                                src={houseImg}
                                                className="recourse-img"
                                                alt="house"
                                            />
                                            10/35
                                        </div>
                                        <div className="player-stat-strength width-full half-height no-select">
                                            <img
                                                src={strengthImg}
                                                className="recourse-img strength-recourse-img"
                                                alt="strength"
                                            />
                                            1000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-pink-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-house width-full half-height no-select">
                                            <img
                                                src={houseImg}
                                                className="recourse-img"
                                                alt="house"
                                            />
                                            10/35
                                        </div>
                                        <div className="player-stat-strength width-full half-height no-select">
                                            <img
                                                src={strengthImg}
                                                className="recourse-img strength-recourse-img"
                                                alt="strength"
                                            />
                                            1000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--------------VICTORY Culture----------------*/}
                <div className="win__victory-culture">
                    <h2 className="win__victory-h2 ">Culture Victory</h2>
                    <div className="victory-explain">
                        <div className="win__victory-background">
                            <div className="win__victory-background-color">
                                <img
                                    src={victoryCultureImg}
                                    className="win__img"
                                    alt="victoryArmy"
                                />
                            </div>
                        </div>
                        <p className="win__victory-p">
                            A victory is achieved through tourism and cultural
                            activities is significant. You must have 800 more
                            units of tourism and twice the size compared to the
                            most prominent tourism empire. Success comes from
                            culture, experiences, and unique offerings, not from
                            competition.
                        </p>
                    </div>
                    <h3 className="win__victory-h2 win__victory-h3">
                        Top players:
                    </h3>
                    <div className="win__players-list">
                        <div className="not-civ-color color-red-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-tourism width-full half-height no-select">
                                            <img
                                                src={tourismImg}
                                                className="recourse-img"
                                                alt="tourism"
                                            />
                                            2200/3600
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-blue-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-tourism width-full half-height no-select">
                                            <img
                                                src={tourismImg}
                                                className="recourse-img"
                                                alt="tourism"
                                            />
                                            1800/4400
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-pink-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-tourism width-full half-height no-select">
                                            <img
                                                src={tourismImg}
                                                className="recourse-img"
                                                alt="tourism"
                                            />
                                            1200/4400
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--------------VICTORY Science----------------*/}
                <div className="win__victory-science">
                    <h2 className="win__victory-h2 ">Culture Victory</h2>
                    <div className="victory-explain">
                        <div className="win__victory-background">
                            <div className="win__victory-background-color">
                                <img
                                    src={victoryScienceImg}
                                    className="win__img"
                                    alt="victoryArmy"
                                />
                            </div>
                        </div>
                        <p className="win__victory-p">
                            Victory is achieved through the pursuit of exploring
                            outer space. You must have the right equipment and
                            complete all scientific projects to win. The final
                            goal will be to build a base on the Mars.
                        </p>
                    </div>
                    <h3 className="win__victory-h2 win__victory-h3">
                        Top players:
                    </h3>
                    <div className="win__players-list">
                        <div className="not-civ-color color-red-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="win__value">
                                            <p>Projects completed:</p>
                                            <div className="player-stat-science width-full half-height no-select">
                                                1/4
                                            </div>
                                        </div>

                                        <div className="win__value">
                                            <p>Turns to do a base:</p>
                                            <div className="player-stat-science width-full half-height no-select">
                                                45/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-blue-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="win__value">
                                            <p>Projects completed:</p>
                                            <div className="player-stat-science width-full half-height no-select">
                                                1/4
                                            </div>
                                        </div>

                                        <div className="win__value">
                                            <p>Turns to do a base:</p>
                                            <div className="player-stat-science width-full half-height no-select">
                                                45/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-pink-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="win__value">
                                            <p>Projects completed:</p>
                                            <div className="player-stat-science width-full half-height no-select">
                                                1/4
                                            </div>
                                        </div>

                                        <div className="win__value">
                                            <p>Turns to do a base:</p>
                                            <div className="player-stat-science width-full half-height no-select">
                                                45/50
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*--------------VICTORY Score----------------*/}
                <div className="win__victory-score">
                    <h2 className="win__victory-h2 ">Culture Victory</h2>
                    <div className="victory-explain">
                        <div className="win__victory-background">
                            <div className="win__victory-background-color">
                                <img
                                    src={victoryScoreImg}
                                    className="win__img"
                                    alt="victoryArmy"
                                />
                            </div>
                        </div>
                        <p className="win__victory-p">
                            It's not really about victory; it's about
                            determining the position of the leaders. Players
                            earn points from everything they do. Accumulate
                            points to show who has the best empire and achieve
                            top rankings by the end of the game!
                        </p>
                    </div>
                    <h3 className="win__victory-h2 win__victory-h3">
                        Top players:
                    </h3>
                    <div className="win__players-list">
                        <div className="not-civ-color color-red-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-score width-full half-height no-select">
                                            <img
                                                src={centerImg}
                                                className="recourse-img"
                                                alt="tourism"
                                            />
                                            2200
                                        </div>
                                        <button className="win__details-btn">
                                            Details▼
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-blue-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-score width-full half-height no-select">
                                            <img
                                                src={centerImg}
                                                className="recourse-img"
                                                alt="tourism"
                                            />
                                            1800
                                        </div>
                                        <button className="win__details-btn">
                                            Details▲
                                        </button>
                                    </div>
                                    <ul className="win__details">
                                        <li className="win__details-piece">
                                            <div className="player-stat-score width-full half-height no-select">
                                                <img
                                                    src={centerImg}
                                                    className="recourse-img"
                                                    alt="tourism"
                                                />
                                                1800
                                            </div>
                                            <p className="win__details-piece-p">
                                                uufewf fewf ewffewf fwefwefew
                                            </p>
                                        </li>
                                        <li className="win__details-piece">
                                            <div className="player-stat-score width-full half-height no-select">
                                                <img
                                                    src={centerImg}
                                                    className="recourse-img"
                                                    alt="tourism"
                                                />
                                                200
                                            </div>
                                            <p className="win__details-piece-p">
                                                Tourism
                                            </p>
                                        </li>
                                        <li className="win__details-piece">
                                            <div className="player-stat-score width-full half-height no-select">
                                                <img
                                                    src={centerImg}
                                                    className="recourse-img"
                                                    alt="tourism"
                                                />
                                                20
                                            </div>
                                            <p className="win__details-piece-p">
                                                Tourism
                                            </p>
                                        </li>
                                        <li className="win__details-piece">
                                            <div className="player-stat-score width-full half-height no-select">
                                                <img
                                                    src={centerImg}
                                                    className="recourse-img"
                                                    alt="tourism"
                                                />
                                                200
                                            </div>
                                            <p className="win__details-piece-p">
                                                Army strength
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="not-civ-color color-pink-g">
                            <div className="win__player">
                                <div className="win__player-img-div">
                                    <img
                                        src={resourceHorsesImg}
                                        className="win__img"
                                        alt="victoryArmy"
                                    />
                                </div>
                                <div className="win__name-and-stats">
                                    <h2 className="win__stats-nickname">
                                        TNTeshka
                                    </h2>
                                    <div className="win-stats">
                                        <div className="player-stat-score width-full half-height no-select">
                                            <img
                                                src={centerImg}
                                                className="recourse-img"
                                                alt="tourism"
                                            />
                                            1200
                                        </div>
                                        <button className="win__details-btn">
                                            Details▼
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
