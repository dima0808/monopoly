import "./styles.css";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import goldImg from "../../../../../images/icon-gold.png";
import {propertiesInfo} from "../../../../../constraints";
import Cookies from "js-cookie";
import tourismImg from "../../../../../images/icon-tourism.png";
// import tourismImg from "../../../../../images/icon-tourism.png";

export default function Empire({
                                   currentUser,
                                   selectProperty,
                                   gameSettings,
                                   properties,
                                   handleUpgradeProperty,
                                   handleDowngradeProperty,
                               }) {

    const sortedProperties = Object.keys(properties).sort((a, b) => {
        const propertyA = properties[a];
        const propertyB = properties[b];
        if (!(propertyA.member && propertyA.member.user.username === currentUser.user.username)) {
            return 0;
        }
        if (!(propertyB.member && propertyB.member.user.username === currentUser.user.username)) {
            return 0;
        }

        const lowestNotOwnedLevelA = propertyA.upgrades.find(
            (upgrade) => !upgrade.isOwned && upgrade.level.startsWith("LEVEL")
        );
        const lowestNotOwnedLevelB = propertyB.upgrades.find(
            (upgrade) => !upgrade.isOwned && upgrade.level.startsWith("LEVEL")
        );

        if (!lowestNotOwnedLevelA && !lowestNotOwnedLevelB) return 0;
        if (!lowestNotOwnedLevelA) return 1;
        if (!lowestNotOwnedLevelB) return -1;

        const isUpgradeDisabledA = currentUser.gold < lowestNotOwnedLevelA?.price ||
            (propertyA.upgradeRequirements.length > 0 &&
                propertyA.upgradeRequirements.some(
                    (upg) => upg.level === lowestNotOwnedLevelA?.level
                ) &&
                Object.values(
                    propertyA.upgradeRequirements.find(
                        (upgrade) => upgrade.level === lowestNotOwnedLevelA?.level
                    ).requirements
                ).some((req) => req === false));

        const isUpgradeDisabledB = currentUser.gold < lowestNotOwnedLevelB?.price ||
            (propertyB.upgradeRequirements.length > 0 &&
                propertyB.upgradeRequirements.some(
                    (upg) => upg.level === lowestNotOwnedLevelB?.level
                ) &&
                Object.values(
                    propertyB.upgradeRequirements.find(
                        (upgrade) => upgrade.level === lowestNotOwnedLevelB?.level
                    ).requirements
                ).some((req) => req === false));

        return isUpgradeDisabledA - isUpgradeDisabledB;
    });

    return (
        <div>
            {sortedProperties.map((key) => {
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
                    const highestOwnedLevel =
                        ownedLevels[ownedLevels.length - 1];
                    const propertyHighestLevelInfo =
                        propertiesInfo[property.position][
                            highestOwnedLevel.level
                            ];

                    const lowestNotOwnedLevel = property.upgrades.find(
                        (upgrade) =>
                            !upgrade.isOwned &&
                            upgrade.level.startsWith("LEVEL")
                    );

                    const isUpgradeDisabled = currentUser.gold < lowestNotOwnedLevel?.price ||
                        (property.upgradeRequirements.length > 0 &&
                            property.upgradeRequirements.some(
                                (upg) =>
                                    upg.level ===
                                    lowestNotOwnedLevel?.level
                            ) &&
                            Object.values(
                                property.upgradeRequirements.find(
                                    (upgrade) =>
                                        upgrade.level ===
                                        lowestNotOwnedLevel?.level
                                ).requirements
                            ).some(
                                (req) => req === false
                            ));

                    const isRedeemDisabled = currentUser.gold <
                        Math.floor(
                            ownedLevels[0].price *
                            gameSettings.redemptionCoefficient
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
                                className={`white-blur ${
                                    property.mortgage &&
                                    property.mortgage !== -1
                                        ? "gray-blur"
                                        : ""
                                }`}
                                style={{
                                    "--mortgage-value": `"${property.mortgage}"`,
                                }}
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
                                        {property.goldPerTurn > 0 && <div className="gold-on-step stats-div">
                                            Gold per turn:
                                            <div
                                                className="player-stat-gold gold-per-turn width-full pointer no-select">
                                                <img
                                                    src={goldPerTurnImg}
                                                    className="recourse-img"
                                                    alt="gold"
                                                />
                                                {property.goldPerTurn}
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                {/*<div className="p-discount flex-between">*/}
                                {/*    <p className="your-chance">(80%) discount</p>*/}
                                {/*    <p className="your-chance">(50%) of the cost</p>*/}
                                {/*</div>*/}
                                <div className="proprty-btns-div flex-between">
                                    {!highestOwnedLevel.level.startsWith("LEVEL_4_") && lowestNotOwnedLevel &&
                                        property.mortgage === -1 && (
                                            <button
                                                disabled={!lowestNotOwnedLevel.level.startsWith("LEVEL_4_") &&
                                                    isUpgradeDisabled}
                                                onClick={() => {
                                                    if (lowestNotOwnedLevel.level.startsWith("LEVEL_4_")) {
                                                        selectProperty(property.position);
                                                    } else {
                                                        handleUpgradeProperty(property.position);
                                                    }
                                                }}
                                                className="pay-btn decision-button decision-button-green"
                                            >
                                                {lowestNotOwnedLevel.level.startsWith("LEVEL_4_") ? (
                                                    "choose"
                                                ) : (
                                                    <>
                                                        upgrade:
                                                        <div className="player-stat-gold width-full pointer no-select">
                                                            <img
                                                                src={goldImg}
                                                                className="recourse-img"
                                                                alt="gold"
                                                            />
                                                            <p>
                                                                {
                                                                    lowestNotOwnedLevel.price
                                                                }
                                                            </p>
                                                        </div>
                                                    </>
                                                )}

                                            </button>
                                        )}
                                    {property.mortgage !== -1 && (
                                        <button
                                            disabled={isRedeemDisabled}
                                            onClick={() =>
                                                handleUpgradeProperty(
                                                    property.position
                                                )
                                            }
                                            className="pay-btn decision-button decision-button-green"
                                        >
                                            redeem:
                                            <div className="player-stat-gold width-full pointer no-select">
                                                <img
                                                    src={goldImg}
                                                    className="recourse-img"
                                                    alt="gold"
                                                />
                                                <p>
                                                    {Math.floor(
                                                        ownedLevels[0]
                                                            .price *
                                                        gameSettings.redemptionCoefficient
                                                    )}
                                                </p>
                                            </div>
                                        </button>
                                    )}
                                    {property.mortgage === -1 && (
                                        <button
                                            className="pay-btn decision-button decision-button-red"
                                            onClick={() =>
                                                handleDowngradeProperty(
                                                    property.position
                                                )
                                            }
                                        >
                                            {highestOwnedLevel.level ===
                                            "LEVEL_1"
                                                ? "pledge"
                                                : "demote"}
                                            :
                                            <div className="player-stat-gold width-full pointer no-select">
                                                <img
                                                    src={goldImg}
                                                    className="recourse-img"
                                                    alt="gold"
                                                />
                                                <p>
                                                    +
                                                    {Math.floor(
                                                        highestOwnedLevel.price *
                                                        (highestOwnedLevel.level ===
                                                        "LEVEL_1"
                                                            ? gameSettings.mortgageGoldCoefficient
                                                            : gameSettings.demoteGoldCoefficient)
                                                    )}
                                                </p>
                                            </div>
                                        </button>
                                    )}
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
