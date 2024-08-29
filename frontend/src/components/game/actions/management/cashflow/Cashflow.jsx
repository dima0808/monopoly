import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";

export default function Cashflow() {
    return (
        <div>
            <div className="value-yellow">
                <div className="value">
                    <h2>Value per turn:</h2>
                    <div className="player-stat-gold gold-per-turn width-full no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        +34
                    </div>
                </div>
            </div>
            <div className="marg-value">
                <div className="value ">
                    <h2>Value per turn:</h2>
                    <div className="player-stat-gold gold-per-turn width-full no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        +34
                    </div>
                </div>

                <ul className="value-ul">
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +34
                        </div>
                        <div className="div-h3">
                            <h3>"Museum in Helecarnasi"</h3>
                        </div>
                    </li>
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +3
                        </div>
                        <h3>from union</h3>
                    </li>
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +34
                        </div>
                        <div className="div-h3">
                            <h3>
                                from{" "}
                                <span className="cell-span">
                                    {" "}
                                    "Museum in Helecarnasi"
                                </span>
                            </h3>
                        </div>
                    </li>
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +3
                        </div>
                        <h3>from union</h3>
                    </li>
                </ul>
            </div>
            <div className="marg-value marg-value-red">
                <div className="value ">
                    <h2>Value per turn: </h2>
                    <div className="player-stat-gold gold-per-turn width-full no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        -10
                    </div>
                </div>
                <ul className="value-ul">
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +34
                        </div>
                        <div className="div-h3">
                            <h3>"Museum in Helecarnasi efwfwe ffweffiwj"</h3>
                        </div>
                    </li>
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +3
                        </div>
                        <h3>
                            from union <span className="cell-span"> War </span>{" "}
                            with <span className="cell-span"> dimitri08 </span>
                        </h3>
                    </li>
                </ul>
            </div>
        </div>
    );
}
