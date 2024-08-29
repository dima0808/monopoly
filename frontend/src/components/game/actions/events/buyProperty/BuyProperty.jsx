import "./styles.css";
import resourceHorsesImg from "../../../../../images/icon_resource_horses.png";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
export default function BuyProperty() {
    return (
        <div className="property-color">
            <h2 className="property-cell-name">Horses</h2>
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
                    <div className="gold-on-step stats-div">
                        Gold per turn:
                        <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +34
                        </div>
                    </div>
                    {/* <div className="gold-on-step stats-div">
                        Tourism:
                        <div className="player-stat-tourism width-full no-select">
                            <img
                                src={tourismImg}
                                className="recourse-img"
                                alt="tourism"
                            />
                            40
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="condition-div">
                <p className="condition-p">
                    If u have an <span>Arena</span> and the mather
                </p>
            </div>
            <div className="condition-div condition-div-compleated">
                <p className="condition-p">
                    If u have an <span>Arena</span> and the mather
                </p>
            </div>
            <h2 className="wonder-efect">Wonder efect:</h2>
            <div className="property-modifier-div property-div-compleated modifiered-by-wonder">
                <h3 className="property-modifier-h3">Temple of Artemis</h3>
                <div className="property-grid-3">
                    <div className="property-gridimg-img-div">
                        <img
                            src={resourceHorsesImg}
                            className="property-img"
                            alt="gold"
                        />
                    </div>
                    <p className="condition-p">
                        improves <span>horses,</span> <span>dears,</span>
                        <span> banana</span>
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
                        {/* <div className="property-mini-flex">
                            <p className="property-new-stats-p">tour.</p>
                            <div className="player-stat-tourism width-full no-select">
                                <img
                                    src={tourismImg}
                                    className="recourse-img"
                                    alt="tourism"
                                />
                                400
                            </div>
                        </div> */}
                        <div className="property-mini-flex">
                            <p className="property-new-stats-p">g.o.t</p>
                            <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                <img
                                    src={goldImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                1
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="decision-buttons flex-between">
                <button className="pay-btn decision-button decision-button-green">
                    buy:
                    <div className="player-stat-gold width-full pointer no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        <p>1000</p>
                    </div>
                </button>
                <button className="decision-button decision-button-red">
                    skip
                </button>
            </div>
        </div>
    );
}
