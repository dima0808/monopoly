import "./styles.css";

import goldImg from "../../../../../images/icon-gold.png";
import {propertiesInfo} from "../../../../../constraints";
import Cookies from "js-cookie";
// import tourismImg from "../../../../../images/icon-tourism.png";

export default function Empire({
                                   currentUser,
                                   selectProperty,
                                   gameSettings,
                                   properties,
                                   handleUpgradeProperty,
                                   handleDowngradeProperty
                               }) {
    return (
        <div>
            {properties &&
                Object.keys(properties).map((key) => {
                    const property = properties[key];
                    if (
                        property.member &&
                        property.member.user.username ===
                        Cookies.get("username")
                    ) {
                        const propertyName =
                            propertiesInfo[property.position]["LEVEL_1"].name;

                        const ownedLevels = property.upgrades.filter(
                            (upgrade) =>
                                upgrade.isOwned &&
                                upgrade.level.startsWith("LEVEL")
                        );
                        const highestOwnedLevel = ownedLevels[ownedLevels.length - 1];
                        const propertyHighestLevelInfo =
                            propertiesInfo[property.position][highestOwnedLevel.level];

                        const lowestNotOwnedLevel = property.upgrades.find(
                            (upgrade) =>
                                !upgrade.isOwned &&
                                upgrade.level.startsWith("LEVEL")
                        );

                        return (
                            <div
                                key={key}
                                className={`property-color empire-component color-${property.member.color}-g`}
                            >
                                <h2
                                    onClick={() =>
                                        selectProperty(property.position)
                                    }
                                    className="property-cell-name"
                                >
                                    {propertyName}
                                </h2>
                                <div
                                    className={`white-blur ${property.mortgage && property.mortgage !== -1 ? 
                                        "gray-blur" : ""}`}
                                    style={{"--mortgage-value": `"${property.mortgage}"`}}
                                >
                                    <div className="property-grid">
                                        <div
                                            onClick={() =>
                                                selectProperty(
                                                    property.position
                                                )
                                            }
                                            className="property-img-div"
                                        >
                                            <img
                                                src={
                                                    propertyHighestLevelInfo.src
                                                }
                                                className="property-img"
                                                alt={propertyName}
                                            />
                                        </div>
                                        <div className="property-stats-div">
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
                                                <div
                                                    className="player-stat-gold gold-per-turn width-full pointer no-select">
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
                                    {/*<div className="p-discount flex-between">*/}
                                    {/*    <p className="your-chance">(80%) discount</p>*/}
                                    {/*    <p className="your-chance">(50%) of the cost</p>*/}
                                    {/*</div>*/}
                                    <div className="proprty-btns-div flex-between">
                                        {(lowestNotOwnedLevel && property.mortgage === -1) &&
                                            <button
                                                disabled={
                                                    currentUser.gold <
                                                    lowestNotOwnedLevel.price ||
                                                    (property
                                                            .upgradeRequirements
                                                            .length > 0 &&
                                                        property.upgradeRequirements.some(
                                                            (upg) =>
                                                                upg.level ===
                                                                lowestNotOwnedLevel.level
                                                        ) &&
                                                        Object.values(
                                                            property.upgradeRequirements.find(
                                                                (upgrade) =>
                                                                    upgrade.level ===
                                                                    lowestNotOwnedLevel.level
                                                            ).requirements
                                                        ).some(
                                                            (req) =>
                                                                req === false
                                                        ))
                                                }
                                                onClick={() => handleUpgradeProperty(property.position)}
                                                className="pay-btn decision-button decision-button-green"
                                            >
                                                upgrade:
                                                <div className="player-stat-gold width-full pointer no-select">
                                                    <img
                                                        src={goldImg}
                                                        className="recourse-img"
                                                        alt="gold"
                                                    />
                                                    <p>{lowestNotOwnedLevel.price}</p>
                                                </div>
                                            </button>
                                        }
                                        {property.mortgage !== -1 &&
                                            <button
                                                disabled={currentUser.gold <
                                                    Math.floor(ownedLevels[0].price * gameSettings.redemptionCoefficient)}
                                                onClick={() => handleUpgradeProperty(property.position)}
                                                className="pay-btn decision-button decision-button-green"
                                            >
                                                redeem:
                                                <div className="player-stat-gold width-full pointer no-select">
                                                    <img
                                                        src={goldImg}
                                                        className="recourse-img"
                                                        alt="gold"
                                                    />
                                                    <p>{Math.floor(ownedLevels[0].price * gameSettings.redemptionCoefficient)}</p>
                                                </div>
                                            </button>
                                        }
                                        {property.mortgage === -1 &&
                                            <button className="pay-btn decision-button decision-button-red"
                                                    onClick={() => handleDowngradeProperty(property.position)}>
                                                {highestOwnedLevel.level === 'LEVEL_1' ? 'pledge' : 'demote'}:
                                                <div className="player-stat-gold width-full pointer no-select">
                                                    <img
                                                        src={goldImg}
                                                        className="recourse-img"
                                                        alt="gold"
                                                    />
                                                    <p>+{Math.floor(highestOwnedLevel.price *
                                                        (highestOwnedLevel.level === 'LEVEL_1' ?
                                                                gameSettings.mortgageGoldCoefficient
                                                                :
                                                                gameSettings.demoteGoldCoefficient
                                                        ))
                                                    }</p>
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
        </div>
    );
}
