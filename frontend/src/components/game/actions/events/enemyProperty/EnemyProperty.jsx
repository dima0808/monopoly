import "./styles.css";
import resourceHorsesImg from "../../../../../images/icon_resource_horses.png";
import goldImg from "../../../../../images/icon-gold.png";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import strengthImg from "../../../../../images/icon-strength.png";
export default function EnemyProperty() {
    return (
        <div className="property-color in-war color-yellow-g">
            <h2 className="property-cell-name">Horses</h2>
            <div className="white-blur">
                <div className="property-grid">
                    <div className="property-img-div">
                        <img
                            src={resourceHorsesImg}
                            className="property-img"
                            alt="gold"
                        />
                    </div>
                    <div className="property-stats-div">
                        <div className="total-cost stats-div">
                            Total cost:
                            <div className="player-stat-gold width-full pointer no-select">
                                <img
                                    src={goldImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                1000
                            </div>
                        </div>
                        <div className="gold-on-step stats-div">
                            Gold on step:
                            <div className="player-stat-gold  width-full pointer no-select">
                                <img
                                    src={goldImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                340
                            </div>
                        </div>
                        {/* <div className="gold-on-step stats-div">
                        Gold per turn:
                        <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                            <img
                                src={goldPerTurnImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +34
                        </div>
                    </div> */}
                        <div className="gold-on-step stats-div">
                            Tourism:
                            <div className="player-stat-tourism width-full no-select">
                                <img
                                    src={tourismImg}
                                    className="recourse-img"
                                    alt="tourism"
                                />
                                40
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="h2-total">Total strength in fight:</h2>
                <div className="war-grid ">
                    <div className="war-div enemy-war">
                        <div className="fight-total">
                            Enemy
                            <div className="player-stat-strength width-full no-select">
                                <img
                                    src={strengthImg}
                                    className="recourse-img strength-recourse-img"
                                    alt="strength"
                                />
                                1000
                            </div>
                        </div>

                        <ul className="ul-war-modeficators">
                            <li className="war-modeficator">
                                army d strength front
                                <div className="inline-block">
                                    <div className="player-stat-strength width-full no-select">
                                        <img
                                            src={strengthImg}
                                            className="recourse-img strength-recourse-img"
                                            alt="strength"
                                        />
                                        1000
                                    </div>
                                </div>
                            </li>
                            <li className="war-modeficator">
                                distict upgrades{" "}
                                <div className="inline-block">
                                    <div className="player-stat-strength width-full no-select">
                                        <img
                                            src={strengthImg}
                                            className="recourse-img strength-recourse-img"
                                            alt="strength"
                                        />
                                        1000
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="war-div your-war">
                        <div className="fight-total">
                            You
                            <div className="player-stat-strength width-full no-select">
                                <img
                                    src={strengthImg}
                                    className="recourse-img strength-recourse-img"
                                    alt="strength"
                                />
                                10
                            </div>
                        </div>
                        <ul className="ul-war-modeficators"></ul>
                    </div>

                    <p className="your-chance">win chance (20%)</p>
                    <p className="your-chance">leave chance (50%)</p>
                </div>
                <div className="decision-buttons flex-between">
                    <button className="decision-button decision-button-red">
                        attack
                    </button>
                    <button className="decision-button decision-button-green">
                        go away
                    </button>
                </div>
            </div>
        </div>
    );
}
