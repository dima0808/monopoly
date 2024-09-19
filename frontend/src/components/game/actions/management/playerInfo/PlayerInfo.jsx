import "./styles.css";
import resourceHorsesImg from "../../../../../images/japan-leader.png";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import strengthImg from "../../../../../images/icon-strength.png";
import warImg from "../../../../../images/icon-war.png";
import unionImg from "../../../../../images/icon-union.png";
export default function PlayerInfo() {
    return (
        <div className="property-color color-red hero-info-managment player-info-managment">
            <h2 className="property-cell-name property-player-name">
                TNTeshka
            </h2>
            <h2 className="property-cell-name">Columb</h2>

            <div className="radiant-white-gradient">
                <div className="property-img-div property-hero">
                    <img
                        src={resourceHorsesImg}
                        className="property-img"
                        alt="gold"
                    />
                </div>
            </div>
            <div className="player-abilitys">
                <div className="player-relations-div">
                    <h3 className="player-relations-h3">Player relations:</h3>
                    <div className="player-relations">
                        <div className="player-relation-civ-div civ-color-red war-img">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <div className="player-relation-civ-div civ-color-blue union-img">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <div className="player-relation-civ-div civ-color-green war-img">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <div className="player-relation-civ-div">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <div className="player-relation-civ-div">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                    </div>
                    <div className="relation-btns flex-between">
                        <button className="pay-btn decision-button decision-button-blue">
                            make union
                            <div className="inline-block">
                                <img
                                    src={unionImg}
                                    className="get-union-img"
                                    alt="gold"
                                />
                            </div>
                        </button>
                        <button className="pay-btn decision-button decision-button-green">
                            delegation
                            <div className="player-stat-gold width-full pointer no-select">
                                <img
                                    src={goldImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                <p>10</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="hero-abilitys">
                    <h2 className="hero-abilitys-h2">Бий і уніжай:</h2>
                    <p className="hero-abilitys-p">
                        при захоплені міста отримає додаткове золото
                    </p>
                    <h2 className="hero-abilitys-h2">Бий і уніжай:</h2>
                    <p className="hero-abilitys-p">
                        при захоплені міста отримає додаткове золото,
                        <div className="inline-block">
                            <div className="player-stat-gold width-full pointer no-select">
                                <img
                                    src={goldImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                1000
                            </div>
                        </div>
                        також має змогу викрасти <span>коня</span>
                    </p>
                    <h2 className="hero-abilitys-h2">Ганза:</h2>
                    <p className="hero-abilitys-p">
                        заміняє <span>промишлєну зону</span> та має унікальний
                        ефект
                    </p>
                </div>

                <div className="property-modifier-div property-div-compleated unic">
                    <h3 className="property-modifier-h3">Ganza</h3>
                    <div className="property-grid-3">
                        <div className="property-gridimg-img-div">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <p className="condition-p">
                            Can bye if you are on the cell
                        </p>
                        <div className="property-new-stats">
                            <div className="property-mini-flex">
                                <p className="property-new-stats-p">t.c</p>
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    1000
                                </div>
                            </div>
                            <div className="property-mini-flex">
                                <p className="property-new-stats-p">g.o.s</p>
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    100
                                </div>
                            </div>

                            <div className="property-mini-flex">
                                <p className="property-new-stats-p">tour.</p>
                                <div className="player-stat-tourism width-full no-select">
                                    <img
                                        src={tourismImg}
                                        className="recourse-img"
                                        alt="tourism"
                                    />
                                    400
                                </div>
                            </div>
                            {/* <div className="property-mini-flex">
                            <p className="property-new-stats-p">g.o.t</p>
                            <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                <img
                                    src={goldPerTurnImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                1
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
                <h2 className="unic-efect-h2">Unic efect:</h2>
                <div className="property-modifier-div property-div-compleated unic-efect modifiered">
                    <h3 className="property-modifier-h3">Ganza</h3>
                    <div className="property-grid-3">
                        <div className="property-gridimg-img-div">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <p className="condition-p">
                            Can bye if you are on the cell
                        </p>
                        <div className="property-new-stats">
                            <div className="property-mini-flex">
                                <p className="property-new-stats-p">g.o.s</p>
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    100
                                </div>
                            </div>

                            <div className="property-mini-flex">
                                <p className="property-new-stats-p">tour.</p>
                                <div className="player-stat-tourism width-full no-select">
                                    <img
                                        src={tourismImg}
                                        className="recourse-img"
                                        alt="tourism"
                                    />
                                    400
                                </div>
                            </div>
                            {/* <div className="property-mini-flex">
                            <p className="property-new-stats-p">g.o.t</p>
                            <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                <img
                                    src={goldPerTurnImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                1
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
