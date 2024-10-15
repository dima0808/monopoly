import "./styles.css";
import { propertiesInfo } from "../../../../constraints";

import blueStarImg from "../../../../images/star-blue.png";
import yellowStarImg from "../../../../images/star-yellow.png";

export default function Cell({direction, mirror = false, noneUpgrades = false, specialType, property, selectProperty}) {
    const baseClass = `object-${direction}`;
    const priceClass = specialType
        ? `${baseClass}__price ${baseClass}__price-${specialType}`
        : `${baseClass}__price`;
    const cellClass = noneUpgrades
        ? `${baseClass}__cell ${baseClass}__cell-none-upgrades`
        : `${baseClass}__cell`;

    if (!property) {
        return null;
    } else {
        const ownedLevels = property.upgrades.filter(
            (upgrade) => upgrade.isOwned && upgrade.level.startsWith("LEVEL")
        );
        const highestOwnedLevel = ownedLevels[ownedLevels.length - 1]?.level;
        const propertyHighestLevelInfo =
            propertiesInfo[property.position][highestOwnedLevel];
        const propertyFirstLevelInfo =
            propertiesInfo[property.position]["LEVEL_1"];

        return (
            <div className={` ${baseClass} ${mirror && "mirror"} border`}>
                <div
                    className={
                        priceClass + " no-select" +
                        (property.member ? " object-gold-on-step" : "") +
                        ((property.member && specialType === "wonder") ? " object-tourism" : "")
                    }
                >
                    {!property.member &&
                        property.upgrades.find(
                            (upgrade) => upgrade.level === "LEVEL_1"
                        ).price}
                    {property.member && (specialType === "wonder" ? property.tourismOnStep :
                        (property.goldOnStep + ((property.position === 7 || property.position === 30) ? "x" : "")))}
                </div>
                <div
                    className={
                        cellClass +
                        (property.member
                            ? " color-" + property.member.color + "-g"
                            : "")
                    }
                >
                    <div
                        onClick={selectProperty}
                        className={`not-blur ${property.mortgage && property.mortgage !== -1 ? "gray-blur" : ""}`}
                        style={{"--mortgage-value": `"${property.mortgage}"`}}
                    >
                        <img
                            src={
                                propertyHighestLevelInfo
                                    ? propertyHighestLevelInfo.src
                                    : propertyFirstLevelInfo.src
                            }
                            alt={propertyFirstLevelInfo.name}
                            className="cell-img"
                        />
                    </div>
                </div>
                {noneUpgrades ? null : (
                    <div className={`${baseClass}__upgrades`}>
                    {property.member &&
                            (() => {
                                const ownedLevels = property.upgrades.filter(
                                    (upgrade) =>
                                        upgrade.isOwned &&
                                        upgrade.level.startsWith("LEVEL")
                                );
                                const allLevels =
                                    ownedLevels.length ===
                                    property.upgrades.filter((upgrade) =>
                                        upgrade.level.startsWith("LEVEL")
                                    ).length;

                                if ((specialType === "government" && highestOwnedLevel.startsWith("LEVEL_4_"))
                                    || allLevels) {
                                    return (
                                        <img
                                            src={yellowStarImg}
                                            alt="Yellow Star"
                                            className="star-yellow"
                                        />
                                    );
                                } else {
                                    return Array.from({
                                        length: ownedLevels.length - 1,
                                    }).map((_, index) => (
                                        <img
                                            key={index}
                                            src={blueStarImg}
                                            alt="Blue Star"
                                            className="star-blue"
                                        />
                                    ));
                                }
                            })()}
                    </div>
                )}
            </div>
        );
    }
}
