import "./styles.css";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import goldImg from "../../../../../images/icon-gold.png";

import warDepartmentImg from "../../../../../images/building_government_build3-3_icon_gov_military.png";
import scienceDepartmentImg from "../../../../../images/building_government_build3-1_icon_gov_science.png";
import cultureDepartmentImg from "../../../../../images/building_government_build3-2_icon_gov_culture.png";

// import tourismImg from "../../../../../images/icon-tourism.png";
import {
    propertiesInfo,
    requirements,
    upgradesImages,
} from "../../../../../constraints";
import Cookies from "js-cookie";
import {useState} from "react";

export default function Property({
    currentUser,
    property,
    gameSettings,
    handleUpgradeProperty,
    handleDowngradeProperty,
}) {
    const propertyName = propertiesInfo[property.position]["LEVEL_1"].name;

    const [selectedDepartment, setSelectedDepartment] = useState("War");

    const renderDepartmentContent = (department) => {
        switch (department) {
            case "War":
                return (
                    <div className="property-modifier-div government property-div-compleated">
                        <h3 className="property-modifier-h3">
                            War Department
                        </h3>
                        <div className="property-grid-3 ">
                            <div className="property-gridimg-img-div">
                                <img
                                    src={warDepartmentImg}
                                    className="property-img"
                                    alt="government"
                                />
                            </div>
                            <p className="condition-p"></p>
                            <div className="property-new-stats">
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.o.s
                                    </p>
                                    <div className="player-stat-gold width-full pointer no-select">
                                        <img
                                            src={goldImg}
                                            className="recourse-img"
                                            alt="government"
                                        />
                                        20
                                    </div>
                                </div>
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.p.t
                                    </p>
                                    <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                        <img
                                            src={goldPerTurnImg}
                                            className="recourse-img"
                                            alt="government"
                                        />
                                        40
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Science":
                return (
                    <div className="property-modifier-div government">
                        <h3 className="property-modifier-h3">
                            Science Department
                        </h3>
                        <div className="property-grid-3 ">
                            <div className="property-gridimg-img-div">
                                <img
                                    src={scienceDepartmentImg}
                                    className="property-img"
                                    alt="government"
                                />
                            </div>
                            <p className="condition-p"></p>
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
                                        20
                                    </div>
                                </div>
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.p.t
                                    </p>
                                    <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                        <img
                                            src={goldPerTurnImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        40
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Culture":
                return (
                    <div className="property-modifier-div government">
                        <h3 className="property-modifier-h3">
                            Culture Department
                        </h3>
                        <div className="property-grid-3 ">
                            <div className="property-gridimg-img-div">
                                <img
                                    src={cultureDepartmentImg}
                                    className="property-img"
                                    alt="government"
                                />
                            </div>
                            <p className="condition-p"></p>
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
                                        20
                                    </div>
                                </div>
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.p.t
                                    </p>
                                    <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                        <img
                                            src={goldPerTurnImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        40
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    const renderDepartmentBuff = (department) => {
        switch (department) {
            case "War":
                return (
                    <div className="property-modifier-div government-efect modifiered">
                        <h3 className="property-modifier-h3">War</h3>
                        <div className="property-grid-3">
                            <div className="property-gridimg-img-div">
                                <img
                                    src={goldImg}
                                    className="property-img"
                                    alt="government"
                                />
                            </div>
                            <p className="condition-p">
                                Вайна вайна убивать резать
                            </p>
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
                                        100
                                    </div>
                                </div>
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.o.t
                                    </p>
                                    <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                        <img
                                            src={goldPerTurnImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Science":
                return (
                    <div className="property-modifier-div government-efect modifiered">
                        <h3 className="property-modifier-h3">Science</h3>
                        <div className="property-grid-3">
                            <div className="property-gridimg-img-div">
                                <img
                                    src={goldImg}
                                    className="property-img"
                                    alt="government"
                                />
                            </div>
                            <p className="condition-p">
                                фрі сім
                            </p>
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
                                        100
                                    </div>
                                </div>
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.o.t
                                    </p>
                                    <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                        <img
                                            src={goldPerTurnImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Culture":
                return (
                    <div className="property-modifier-div government-efect modifiered">
                        <h3 className="property-modifier-h3">Culture</h3>
                        <div className="property-grid-3">
                            <div className="property-gridimg-img-div">
                                <img
                                    src={goldImg}
                                    className="property-img"
                                    alt="government"
                                />
                            </div>
                            <p className="condition-p">
                                культура культура культура
                            </p>
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
                                        100
                                    </div>
                                </div>
                                <div className="property-mini-flex">
                                    <p className="property-new-stats-p">
                                        g.o.t
                                    </p>
                                    <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                        <img
                                            src={goldPerTurnImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    if (!property.member) {
        const propertyFirstLevel = property.upgrades.find(
            (upgrade) => upgrade.level === "LEVEL_1"
        );
        return (
            <div className="property-color">
                <h2 className="property-cell-name">{propertyName}</h2>
                <div className="white-blur">
                    <div className="property-grid">
                        <div className="property-img-div">
                            <img
                                src={propertiesInfo[property.position]["LEVEL_1"].src}
                                className="property-img"
                                alt={propertyName}
                            />
                        </div>
                        <div className="property-stats-div">
                            <div className="total-cost stats-div">
                                Price:
                                <div className="player-stat-gold  width-full pointer no-select">
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
                                    +{propertyFirstLevel.goldPerTurn}
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
                            {/*        40*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>
                    </div>
                    {property.upgrades.map((upgrade, index) => {
                        const propertyLevelInfo =
                            propertiesInfo[property.position][upgrade.level];
                        const upgradeRequirement =
                            property.upgradeRequirements.find(
                                (upg) => upg.level === upgrade.level
                            );
                        return (
                            <div
                                key={index}
                                className={"property-modifier-div " + (upgrade.isOwned ? "modifiered" : "")}
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
                                    <div>
                                        {(() => {
                                            if (!upgradeRequirement) {
                                                return <p className="condition-p"></p>;
                                            }
                                            const sortedRequirements = Object.entries(upgradeRequirement.requirements)
                                                .sort(([keyA], [keyB]) => {
                                                    const priorityA = requirements[keyA].props.priority || 0;
                                                    const priorityB = requirements[keyB].props.priority || 0;
                                                    return priorityB - priorityA;
                                                });
                                            return sortedRequirements.map(([key]) => requirements[key]);
                                        })()}
                                    </div>
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
                                            <div
                                                className="player-stat-gold gold-per-turn width-full pointer no-select">
                                                <img
                                                    src={goldPerTurnImg}
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
                    {(property.position === 9 ||
                            property.position === 18 ||
                            property.position === 44) &&
                        <div className="property-color project-color property-color-government">
                            <h2 className="project-color-h2"></h2>
                            <div className="property-government-choose">
                                <div
                                    onClick={() => setSelectedDepartment("War")}
                                    className={"project-div-img project-div-img-compleated" +
                                        (selectedDepartment === "War" ? " project-div-img-selected" : "")}>
                                    <img
                                        src={warDepartmentImg}
                                        className="project-img"
                                        alt="government"
                                    />
                                </div>
                                <div
                                    onClick={() => setSelectedDepartment("Science")}
                                    className={"project-div-img" +
                                        (selectedDepartment === "Science" ? " project-div-img-selected" : "")}>
                                    <img
                                        src={scienceDepartmentImg}
                                        className="project-img"
                                        alt="government"
                                    />
                                </div>
                                <div
                                    onClick={() => setSelectedDepartment("Culture")}
                                    className={"project-div-img" +
                                        (selectedDepartment === "Culture" ? " project-div-img-selected" : "")}>
                                    <img
                                        src={cultureDepartmentImg}
                                        className="project-img"
                                        alt="governmentd"
                                    />
                                </div>
                            </div>
                            {renderDepartmentContent(selectedDepartment)}

                            <h2 className="government-efect-h2">Government effect:</h2>

                            {renderDepartmentBuff(selectedDepartment)}
                        </div>}
                </div>
            </div>
        );
    }
    const ownedLevels = property.upgrades.filter(
        (upgrade) => upgrade.isOwned && upgrade.level.startsWith("LEVEL")
    );
    const highestOwnedLevel = ownedLevels[ownedLevels.length - 1];

    const propertyHighestLevelInfo =
        propertiesInfo[property.position][highestOwnedLevel.level];

    const lowestNotOwnedLevel = property.upgrades.find(
        (upgrade) => !upgrade.isOwned && upgrade.level.startsWith("LEVEL")
    );

    return (
        <div className={"property-color color-" + property.member.color + "-g"}>
            <h2 className="property-cell-name">{propertyName}</h2>
            <div
                className={`white-blur ${
                    property.mortgage && property.mortgage !== -1
                        ? "gray-blur"
                        : ""
                }`}
                style={{"--mortgage-value": `"${property.mortgage}"`}}
            >
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
                                    src={goldPerTurnImg}
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
                                <div>
                                    {(() => {
                                        if (!upgradeRequirement) {
                                            return <p className="condition-p"></p>;
                                        }
                                        const sortedRequirements = Object.entries(upgradeRequirement.requirements)
                                            .sort(([keyA], [keyB]) => {
                                                const priorityA = requirements[keyA].props.priority || 0;
                                                const priorityB = requirements[keyB].props.priority || 0;
                                                return priorityB - priorityA;
                                            });
                                        return sortedRequirements.map(([key]) => requirements[key]);
                                    })()}
                                </div>
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
                                                src={goldPerTurnImg}
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
                {/*                        src={goldPerTurnImg}*/}
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
                {/*                        src={goldPerTurnImg}*/}
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
                {/*                        src={goldPerTurnImg}*/}
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
                {/*                        src={goldPerTurnImg}*/}
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
                {/*                        src={goldPerTurnImg}*/}
                {/*                        className="recourse-img"*/}
                {/*                        alt="gold"*/}
                {/*                    />*/}
                {/*                    1*/}
                {/*                </div>*/}
                {/*            </div> *!/*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {(property.position === 9 ||
                    property.position === 18 ||
                    property.position === 44) &&
                    <div className="property-color project-color property-color-government">
                        <h2 className="project-color-h2">Choose your building</h2>
                        <div className="property-government-choose">
                            <div
                                onClick={() => setSelectedDepartment("War")}
                                className={"project-div-img project-div-img-compleated" +
                                    (selectedDepartment === "War" ? " project-div-img-selected" : "")}>
                                <img
                                    src={warDepartmentImg}
                                    className="project-img"
                                    alt="government"
                                />
                            </div>
                            <div
                                onClick={() => setSelectedDepartment("Science")}
                                className={"project-div-img" +
                                    (selectedDepartment === "Science" ? " project-div-img-selected" : "")}>
                                <img
                                    src={scienceDepartmentImg}
                                    className="project-img"
                                    alt="government"
                                />
                            </div>
                            <div
                                onClick={() => setSelectedDepartment("Culture")}
                                className={"project-div-img" +
                                    (selectedDepartment === "Culture" ? " project-div-img-selected" : "")}>
                                <img
                                    src={cultureDepartmentImg}
                                    className="project-img"
                                    alt="governmentd"
                                />
                            </div>
                        </div>
                        {renderDepartmentContent(selectedDepartment)}

                        <h2 className="government-efect-h2">Government effect:</h2>

                        {renderDepartmentBuff(selectedDepartment)}
                    </div>}
                {Cookies.get("username") === property.member.user.username &&
                    <div className="proprty-btns-div flex-between">
                        {lowestNotOwnedLevel && property.mortgage === -1 && (
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
                        )}
                        {property.mortgage !== -1 && (
                            <button
                                disabled={
                                    currentUser.gold <
                                    ownedLevels[0].price *
                                    gameSettings.redemptionCoefficient
                                }
                                onClick={() =>
                                    handleUpgradeProperty(property.position)
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
                                        {ownedLevels[0].price *
                                            gameSettings.redemptionCoefficient}
                                    </p>
                                </div>
                            </button>
                        )}
                        {property.mortgage === -1 && (
                            <button
                                className="pay-btn decision-button decision-button-red"
                                onClick={() =>
                                    handleDowngradeProperty(property.position)
                                }
                            >
                                {highestOwnedLevel.level === "LEVEL_1"
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
                                        {highestOwnedLevel.price *
                                            (highestOwnedLevel.level === "LEVEL_1"
                                                ? gameSettings.mortgageGoldCoefficient
                                                : gameSettings.demoteGoldCoefficient)}
                                    </p>
                                </div>
                            </button>
                        )}
                    </div>}
            </div>
        </div>
    );
}
