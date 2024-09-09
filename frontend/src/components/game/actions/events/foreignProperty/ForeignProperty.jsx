import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
// import tourismImg from "../../../../../images/icon-tourism/.png";
import {propertiesInfo} from "../../../../../constraints";
export default function ForeignProperty({property, handlePayRent}) {

    const propertyName = propertiesInfo[property.position]['LEVEL_1'].name;

    const ownedLevels = property.upgrades.filter(upgrade => upgrade.isOwned && upgrade.level.startsWith("LEVEL"));
    const highestOwnedLevel = ownedLevels[ownedLevels.length - 1]?.level;
    const propertyHighestLevelInfo = propertiesInfo[property.position][highestOwnedLevel];

    return (
        <div className={"property-color color-" + property.member.color + "-g"}>
            <h2 className="property-cell-name">{propertyName}</h2>
            <div className="property-grid">
                <div className="property-img-div">
                    <img
                        src={propertyHighestLevelInfo.src}
                        className="property-img"
                        alt={propertyName}
                    />
                </div>
                <div className="property-stats-div">
                    <div className="gold-on-step stats-div">
                        Gold on step:
                        <div className="player-stat-gold  width-full pointer no-select">
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
                    {/*<div className="gold-on-step stats-div">*/}
                    {/*    Tourism:*/}
                    {/*    <div className="player-stat-tourism width-full no-select">*/}
                    {/*        <img*/}
                    {/*            src={tourismImg}*/}
                    {/*            className="recourse-img"*/}
                    {/*            alt="tourism"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="decision-buttons flex-between">
                <button onClick={handlePayRent} className="pay-btn decision-button decision-button-green">
                    pay:
                    <div className="player-stat-gold width-full pointer no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        <p>{property.goldOnStep}</p>
                    </div>
                </button>
                <button className="decision-button decision-button-reder">
                    declare war
                </button>
            </div>
        </div>
    );
}
