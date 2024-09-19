import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import { propertiesInfo, requirements } from "../../../../../constraints";
// import tourismImg from "../../../../../images/icon-tourism.png";

export default function BuyProperty({
    member,
    property,
    handleBuyProperty,
    onSkip,
}) {
    const propertyInfoFirstLevel = propertiesInfo[property.position]["LEVEL_1"];
    const propertyFirstLevel = property.upgrades.find(
        (upgrade) => upgrade.level === "LEVEL_1"
    );

    return (
        <div className="property-color">
            <h2 className="property-cell-name">
                {propertyInfoFirstLevel.name}
            </h2>
            <div className="property-grid">
                <div className="property-img-div">
                    <img
                        src={propertyInfoFirstLevel.src}
                        className="property-img"
                        alt="gold"
                    />
                </div>
                <div className="property-stats-div">
                    <div className="total-cost stats-div">
                        Price:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            {propertyFirstLevel.price}
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
                            {propertyFirstLevel.goldOnStep}
                        </div>
                    </div>
                    <div className="gold-on-step stats-div">
                        Gold per turn:
                        <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                            <img
                                src={goldPerTurnImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            {propertyFirstLevel.goldPerTurn}
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

            {property.upgradeRequirements.length > 0 &&
                Object.entries(
                    property.upgradeRequirements.find(
                        (upgrade) => upgrade.level === "LEVEL_1"
                    ).requirements
                ).map(([key, value]) => (
                    <div
                        key={key}
                        className={`condition-div ${
                            value ? "condition-div-compleated" : ""
                        }`}
                    >
                        {requirements[key]}
                    </div>
                ))}

            <div className="decision-buttons flex-between">
                <button
                    disabled={
                        member?.gold < propertyFirstLevel.price ||
                        (property.upgradeRequirements.length > 0 &&
                            Object.values(
                                property.upgradeRequirements.find(
                                    (upgrade) => upgrade.level === "LEVEL_1"
                                ).requirements
                            ).some((req) => req === false))
                    }
                    onClick={handleBuyProperty}
                    className="pay-btn decision-button decision-button-green"
                >
                    buy:
                    <div className="player-stat-gold width-full pointer no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        <p>{propertyFirstLevel.price}</p>
                    </div>
                </button>
                <button
                    onClick={onSkip}
                    className="decision-button decision-button-red"
                >
                    skip
                </button>
            </div>
        </div>
    );
}
