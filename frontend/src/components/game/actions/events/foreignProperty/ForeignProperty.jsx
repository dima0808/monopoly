import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import { propertiesInfo } from "../../../../../constraints";
export default function ForeignProperty({ property, roll, member, handlePayRent, onSkip }) {
    const propertyName = propertiesInfo[property.position]["LEVEL_1"].name;

    const ownedLevels = property.upgrades.filter(
        (upgrade) => upgrade.isOwned && upgrade.level.startsWith("LEVEL")
    );
    const highestOwnedLevel = ownedLevels[ownedLevels.length - 1]?.level;
    const propertyHighestLevelInfo =
        propertiesInfo[property.position][highestOwnedLevel];

    return (
        <div className={"property-color color-" + property.member.color + "-g"}>
            <h2 className="property-cell-name">{propertyName}</h2>
            <div className="white-blur">
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
                                {property.goldOnStep +
                                    ((property.position === 7 || property.position === 30) ? "x" : "")}
                            </div>
                        </div>
                        {property.goldPerTurn > 0 && <div className="gold-on-step stats-div">
                            Gold per turn:
                            <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                <img
                                    src={goldPerTurnImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                {property.goldPerTurn}
                            </div>
                        </div>}
                        {property.tourismOnStep > 0 && <div className="gold-on-step stats-div">
                            Tourism on step:
                            <div className="player-stat-tourism width-full no-select">
                                <img
                                    src={tourismImg}
                                    className="recourse-img"
                                    alt="tourism"
                                />
                                {property.tourismOnStep}
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="decision-buttons flex-between">
                    <button
                        disabled={member?.gold < property.goldOnStep * (roll || 1)}
                        onClick={
                            property.mortgage === -1 ? handlePayRent : onSkip
                        }
                        className="pay-btn decision-button decision-button-green"
                    >
                        {property.mortgage === -1 ? (
                            <>
                                pay:
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    <p>{property.goldOnStep * (roll || 1)}</p>
                                </div>
                            </>
                        ) : (
                            "Skip"
                        )}
                    </button>
                    <button className="decision-button decision-button-reder">
                        declare war
                    </button>
                </div>
            </div>
        </div>
    );
}
