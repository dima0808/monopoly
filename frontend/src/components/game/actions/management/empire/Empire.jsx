import "./styles.css";
import resourceHorsesImg from "../../../../../images/icon_resource_horses.png";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
export default function Empire() {
    return (
        <div>
            <div className="property-color empire-component">
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
                <div className="p-discount flex-between">
                    <p className="your-chance">(80%) discount</p>
                    <p className="your-chance">(50%) of the cost</p>
                </div>
                <div className=" proprty-btns-div flex-between">
                    <button className="pay-btn decision-button decision-button-green">
                        upgrade:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>1000</p>
                        </div>
                    </button>
                    <button className="pay-btn decision-button decision-button-red">
                        demote:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>1000</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="property-color empire-component">
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

                <div className=" proprty-btns-div flex-between">
                    <button className="pay-btn decision-button decision-button-green">
                        upgrade:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>1000</p>
                        </div>
                    </button>
                    <button className="pay-btn decision-button decision-button-red">
                        demote:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>1000</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="property-color empire-component">
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

                <div className=" proprty-btns-div flex-between">
                    <button className="pay-btn decision-button decision-button-green">
                        upgrade:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>1000</p>
                        </div>
                    </button>
                    <button className="pay-btn decision-button decision-button-red">
                        demote:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>1000</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
