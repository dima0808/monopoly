import "./styles.css";

// import resourceHorsesImg from "../../../../../images/icon_resource_horses.png";
import goldImg from "../../../../../images/icon-gold.png";
import {propertiesInfo} from "../../../../../constraints";
import Cookies from "js-cookie";
// import tourismImg from "../../../../../images/icon-tourism.png";

export default function Empire({properties}) {
    return (
        <div>
            {properties && Object.keys(properties).map((key) => {
                const property = properties[key];
                if (property.member && property.member.user.username === Cookies.get('username')) {
                    const propertyInfo = propertiesInfo[property.position]['LEVEL_1'];
                    return (
                        <div key={key} className={`property-color empire-component color-${property.member.color}-g`}>
                            <h2 className="property-cell-name">{propertyInfo.name}</h2>
                            <div className="property-grid">
                                <div className="property-img-div">
                                    <img
                                        src={propertyInfo.src}
                                        className="property-img"
                                        alt={propertyInfo.name}
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
                                            {property.upgrades.find(upgrade => upgrade.level === 'LEVEL_1').price}
                                        </div>
                                    </div>
                                    <div className="gold-on-step stats-div">
                                        Gold on step:
                                        <div className="player-stat-gold width-full pointer no-select">
                                            <img
                                                src={goldImg}
                                                className="recourse-img"
                                                alt="gold"
                                            />
                                            {property.goldOnStep}
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
                                            {property.goldPerTurn}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-discount flex-between">
                                <p className="your-chance">(80%) discount</p>
                                <p className="your-chance">(50%) of the cost</p>
                            </div>
                            <div className="proprty-btns-div flex-between">
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
                    );
                }
                return null;
            })}
        </div>
    );
}
