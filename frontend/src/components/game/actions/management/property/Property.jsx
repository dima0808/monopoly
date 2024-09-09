import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
// import tourismImg from "../../../../../images/icon-tourism.png";
import {
    propertiesInfo,
    requirements,
    upgradesImages,
} from "../../../../../constraints";
export default function Property({
    currentUser,
    property,
    handleUpgradeProperty,
}) {
    const propertyName = propertiesInfo[property.position]["LEVEL_1"].name;

    const ownedLevels = property.upgrades.filter(
        (upgrade) => upgrade.isOwned && upgrade.level.startsWith("LEVEL")
    );
    const highestOwnedLevel = ownedLevels[ownedLevels.length - 1]?.level;
    const propertyHighestLevelInfo =
        propertiesInfo[property.position][highestOwnedLevel];

    const lowestNotOwnedLevel = property.upgrades.find(
        (upgrade) => !upgrade.isOwned && upgrade.level.startsWith("LEVEL")
    );

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
                                +{property.goldPerTurn}
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
                {property.upgrades.map((upgrade, index) => {
                    const propertyLevelInfo =
                        propertiesInfo[property.position][upgrade.level];
                    const upgradeRequirement =
                        property.upgradeRequirements.find(
                            (upg) => upg.level === upgrade.level
                        );
                    const hasFalseRequirement = upgradeRequirement
                        ? Object.values(upgradeRequirement.requirements).some(
                              (value) => !value
                          )
                        : true;
                    return (
                        <div
                            key={index}
                            className={
                                "property-modifier-div " +
                                (upgrade.isOwned ? "modifiered" : "") +
                                (hasFalseRequirement
                                    ? " property-div-compleated"
                                    : "")
                            }
                        >
                            <h3 className="property-modifier-h3">
                                {propertyLevelInfo.name}
                            </h3>
                            <div className="property-grid-3 ">
                                <div className="property-gridimg-img-div">
                                    <img
                                        src={
                                            upgrade.level === "LEVEL_1"
                                                ? propertyLevelInfo.src
                                                : upgradesImages[
                                                      propertyLevelInfo.name
                                                  ]
                                        }
                                        className="property-img"
                                        alt={propertyLevelInfo.name}
                                    />
                                </div>
                                {(() => {
                                    return upgradeRequirement ? (
                                        Object.entries(
                                            upgradeRequirement.requirements
                                        ).map(
                                            ([key, value]) => requirements[key]
                                        )
                                    ) : (
                                        <p className="condition-p"></p>
                                    );
                                })()}
                                <div className="property-new-stats">
                                    <div className="property-mini-flex">
                                        <p className="property-new-stats-p">
                                            g.o.s
                                        </p>
                                        <div className="player-stat-gold width-full pointer no-select">
                                            <img
                                                src={goldImg}
                                                className="recourse-img"
                                                alt="gold"
                                            />
                                            {upgrade.goldOnStep}
                                        </div>
                                    </div>
                                    <div className="property-mini-flex">
                                        <p className="property-new-stats-p">
                                            g.p.t
                                        </p>
                                        <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                            <img
                                                src={goldImg}
                                                className="recourse-img"
                                                alt="gold"
                                            />
                                            {upgrade.goldPerTurn}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/*<h2 className="wonder-efect">Wonder efect:</h2>*/}
                {/*<div className="property-modifier-div property-div-compleated modifiered-by-wonder">*/}
                {/*    <h3 className="property-modifier-h3">Temple of Artemis</h3>*/}
                {/*    <div className="property-grid-3">*/}
                {/*        <div className="property-gridimg-img-div">*/}
                {/*            <img*/}
                {/*                src={resourceHorsesImg}*/}
                {/*                className="property-img"*/}
                {/*                alt="gold"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <p className="condition-p">*/}
                {/*            improves <span>horses,</span> <span>dears,</span>*/}
                {/*            <span> banana</span>*/}
                {/*        </p>*/}
                {/*        <div className="property-new-stats">*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.s</p>*/}
                {/*                <div className="player-stat-gold width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    100*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">tour.</p>*/}
                {/*                <div className="player-stat-tourism width-full no-select">*/}
                {/*                    <img*/}
                {/*                        src={tourismImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="tourism"*/}
                {/*                    />*/}
                {/*                    400*/}
                {/*                </div>*/}
                {/*            </div> *!/*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.t</p>*/}
                {/*                <div className="player-stat-gold gold-per-turn width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="property-modifier-div property-div-compleated unic">*/}
                {/*    <h3 className="property-modifier-h3">Ganza</h3>*/}
                {/*    <div className="property-grid-3">*/}
                {/*        <div className="property-gridimg-img-div">*/}
                {/*            <img*/}
                {/*                src={resourceHorsesImg}*/}
                {/*                className="property-img"*/}
                {/*                alt="gold"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <p className="condition-p">*/}
                {/*            Can bye if you are on the cell*/}
                {/*        </p>*/}
                {/*        <div className="property-new-stats">*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">t.c</p>*/}
                {/*                <div className="player-stat-gold width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1000*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.s</p>*/}
                {/*                <div className="player-stat-gold width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    100*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">tour.</p>*/}
                {/*                <div className="player-stat-tourism width-full no-select">*/}
                {/*                    <img*/}
                {/*                        src={tourismImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="tourism"*/}
                {/*                    />*/}
                {/*                    400*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.t</p>*/}
                {/*                <div className="player-stat-gold gold-per-turn width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1*/}
                {/*                </div>*/}
                {/*            </div> *!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<h2 className="unic-efect-h2">Unic efect:</h2>*/}
                {/*<div className="property-modifier-div property-div-compleated unic-efect modifiered">*/}
                {/*    <h3 className="property-modifier-h3">Ganza</h3>*/}
                {/*    <div className="property-grid-3">*/}
                {/*        <div className="property-gridimg-img-div">*/}
                {/*            <img*/}
                {/*                src={resourceHorsesImg}*/}
                {/*                className="property-img"*/}
                {/*                alt="gold"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <p className="condition-p">*/}
                {/*            Can bye if you are on the cell*/}
                {/*        </p>*/}
                {/*        <div className="property-new-stats">*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.s</p>*/}
                {/*                <div className="player-stat-gold width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    100*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">tour.</p>*/}
                {/*                <div className="player-stat-tourism width-full no-select">*/}
                {/*                    <img*/}
                {/*                        src={tourismImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="tourism"*/}
                {/*                    />*/}
                {/*                    400*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.t</p>*/}
                {/*                <div className="player-stat-gold gold-per-turn width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1*/}
                {/*                </div>*/}
                {/*            </div> *!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<h2 className="modifier-efect-h2">Modifier efect:</h2>*/}
                {/*<div className="property-modifier-div property-div-compleated modifier-efect modifiered">*/}
                {/*    <h3 className="property-modifier-h3">iron</h3>*/}
                {/*    <div className="property-grid-3">*/}
                {/*        <div className="property-gridimg-img-div">*/}
                {/*            <img*/}
                {/*                src={resourceHorsesImg}*/}
                {/*                className="property-img"*/}
                {/*                alt="gold"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <p className="condition-p">*/}
                {/*            buff <span>промишлєну зону</span>*/}
                {/*        </p>*/}
                {/*        <div className="property-new-stats">*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.s</p>*/}
                {/*                <div className="player-stat-gold width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    100*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">tour.</p>*/}
                {/*                <div className="player-stat-tourism width-full no-select">*/}
                {/*                    <img*/}
                {/*                        src={tourismImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="tourism"*/}
                {/*                    />*/}
                {/*                    400*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.t</p>*/}
                {/*                <div className="player-stat-gold gold-per-turn width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1*/}
                {/*                </div>*/}
                {/*            </div> *!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<h2 className="neighborhood-bonus-h2">Neighborhood bonus:</h2>*/}
                {/*<div className="property-modifier-div property-div-compleated neighborhood-bonus modifiered">*/}
                {/*    <h3 className="property-modifier-h3">iron</h3>*/}
                {/*    <div className="property-grid-3">*/}
                {/*        <div className="property-gridimg-img-div">*/}
                {/*            <img*/}
                {/*                src={resourceHorsesImg}*/}
                {/*                className="property-img"*/}
                {/*                alt="gold"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        <p className="condition-p">*/}
                {/*            buff <span>промишлєну зону</span>*/}
                {/*        </p>*/}
                {/*        <div className="property-new-stats">*/}
                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.s</p>*/}
                {/*                <div className="player-stat-gold width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    100*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">tour.</p>*/}
                {/*                <div className="player-stat-tourism width-full no-select">*/}
                {/*                    <img*/}
                {/*                        src={tourismImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="tourism"*/}
                {/*                    />*/}
                {/*                    400*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* <div className="property-mini-flex">*/}
                {/*                <p className="property-new-stats-p">g.o.t</p>*/}
                {/*                <div className="player-stat-gold gold-per-turn width-full pointer no-select">*/}
                {/*                    <img*/}
                {/*                        src={goldImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1*/}
                {/*                </div>*/}
                {/*            </div> *!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className=" proprty-btns-div flex-between">
                    {lowestNotOwnedLevel ? (
                        <button
                            disabled={
                                currentUser.gold < lowestNotOwnedLevel.price ||
                                (property.upgradeRequirements.length > 0 &&
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
                                    ).some((req) => req === false))
                            }
                            onClick={() =>
                                handleUpgradeProperty(property.position)
                            }
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
                    ) : (
                        <div></div>
                    )}
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
