import "./styles.css";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";

import warDepartmentImg
  from "../../../../../images/building_government_build3-3_icon_gov_military.png";
import scienceDepartmentImg
  from "../../../../../images/building_government_build3-1_icon_gov_science.png";
import cultureDepartmentImg
  from "../../../../../images/building_government_build3-2_icon_gov_culture.png";

import {
  propertiesInfo,
  requirements, uniqueEffectsInfo,
  upgradesImages,
} from "../../../../../constraints";
import Cookies from "js-cookie";
import {useState} from "react";
import InfoBlock from "./InfoBlock";

export default function Property({
  currentUser,
  isCurrentUserTurn,
  property,
  gameSettings,
  handleUpgradeProperty,
  handleDowngradeProperty,
}) {
  const propertyName = propertiesInfo[property.position]["LEVEL_1"].name;

  const [selectedDepartment, setSelectedDepartment] = useState("Science");

  let lowestNotOwnedLevel;

  const levelByDepartment = {
    "Science": "LEVEL_4_1",
    "War": "LEVEL_4_2",
    "Culture": "LEVEL_4_3",
  }

  const departmentByLevel = {
    "LEVEL_4_1": "Science",
    "LEVEL_4_2": "War",
    "LEVEL_4_3": "Culture",
  }

  const handleUpgradeRequirement = (property, department) => {
    let levelToFind = levelByDepartment[department];
    const upgrade = property.upgrades.find((upgrade) => upgrade.level === levelToFind);
    const upgradeRequirement =
        property.upgradeRequirements.find(
            (upg) => upg.level === upgrade.level
        );

    if (!lowestNotOwnedLevel) {
      return [upgrade, upgradeRequirement, false];
    }

    const hasFalseRequirement = upgradeRequirement
        ? Object.values(upgradeRequirement.requirements).some((value) => !value) : false;
    const isNextLevel = lowestNotOwnedLevel && "LEVEL_4_1" === lowestNotOwnedLevel.level;

    return [upgrade, upgradeRequirement,
      (!hasFalseRequirement && isNextLevel && property.mortgage === -1) || upgrade.isOwned];
  }

  const renderDepartmentContent = (department) => {
    const [upgrade, upgradeRequirement, isCompleted] = handleUpgradeRequirement(property,
        department);
    const propertyLevelInfo = propertiesInfo[property.position][upgrade.level];
    return (
        <div
            className={
                "property-modifier-div government " +
                (upgrade.isOwned ? " modifiered" : "") +
                (isCompleted ? " property-div-compleated" : "")
            }
        >
          <h3 className="property-modifier-h3">
            {propertyLevelInfo.name}
          </h3>
          <div className="property-grid-3 ">
            <div className="property-gridimg-img-div">
              <img
                  src={upgradesImages[propertyLevelInfo.name]}
                  className="property-img"
                  alt="government"
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
                return sortedRequirements.map(([key, value]) => (
                    <div key={key} className={(value || upgrade.isOwned) ?
                        "condition-p-compleated" : ""}>
                      {requirements[key]}
                    </div>
                ));
              })()}
            </div>
            <div className="property-new-stats">
              <div className="property-mini-flex">
                <p className="property-new-stats-p">
                  cost
                </p>
                <div className="player-stat-gold width-full pointer no-select">
                  <img
                      src={goldImg}
                      className="recourse-img"
                      alt="gold"
                  />
                  {upgrade.price}
                </div>
              </div>
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
                  {upgrade.goldOnStep +
                      ((property.position === 7 || property.position === 30) ? "x" : "")}
                </div>
              </div>
              {upgrade.tourismOnStep > 0 && <div className="property-mini-flex">
                <p className="property-new-stats-p">
                  t.o.s
                </p>
                <div className="player-stat-tourism width-full no-select">
                  <img
                      src={tourismImg}
                      className="recourse-img"
                      alt="tourism"
                  />
                  {upgrade.tourismOnStep}
                </div>
              </div>}
              {upgrade.goldPerTurn > 0 && <div className="property-mini-flex">
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
              </div>}
            </div>
          </div>
          {propertyLevelInfo.info && <InfoBlock info={propertyLevelInfo.info} isOpened={true}/>}
        </div>
    );
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
                    {propertyFirstLevel.goldOnStep +
                        ((property.position === 7 || property.position === 30) ? "x" : "")}
                  </div>
                </div>
                {propertyFirstLevel.tourismOnStep > 0 && <div className="gold-on-step stats-div">
                  Tourism on step:
                  <div className="player-stat-tourism width-full no-select">
                    <img
                        src={tourismImg}
                        className="recourse-img"
                        alt="tourism"
                    />
                    {propertyFirstLevel.tourismOnStep}
                  </div>
                </div>}
                {propertyFirstLevel.goldPerTurn > 0 && <div className="gold-on-step stats-div">
                  Gold per turn:
                  <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                    <img
                        src={goldPerTurnImg}
                        className="recourse-img"
                        alt="gold"
                    />
                    +{propertyFirstLevel.goldPerTurn}
                  </div>
                </div>}
              </div>
            </div>
            {property.upgrades.map((upgrade, index) => {
              if (!upgrade.level.startsWith("LEVEL_")) {
                return null;
              }
              if (upgrade.level.startsWith("LEVEL_4_")) {
                return null;
              }
              const propertyLevelInfo = propertiesInfo[property.position][upgrade.level];
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
                          return sortedRequirements.map(([key, value]) => (
                              <div key={key} className={(value || upgrade.isOwned) ?
                                  "condition-p-compleated" : ""}>
                                {requirements[key]}
                              </div>
                          ));
                        })()}
                      </div>
                      <div className="property-new-stats">
                        <div className="property-mini-flex">
                          <p className="property-new-stats-p">
                            cost
                          </p>
                          <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            {upgrade.price}
                          </div>
                        </div>
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
                            {upgrade.goldOnStep +
                                ((property.position === 7 || property.position === 30) ? "x" : "")}
                          </div>
                        </div>
                        {upgrade.tourismOnStep > 0 && <div className="property-mini-flex">
                          <p className="property-new-stats-p">
                            t.o.s
                          </p>
                          <div className="player-stat-tourism width-full no-select">
                            <img
                                src={tourismImg}
                                className="recourse-img"
                                alt="tourism"
                            />
                            {upgrade.tourismOnStep}
                          </div>
                        </div>}
                        {upgrade.goldPerTurn > 0 && <div className="property-mini-flex">
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
                        </div>}
                      </div>
                    </div>
                    {propertyLevelInfo.info && <InfoBlock info={propertyLevelInfo.info}/>}
                  </div>
              );
            })}
            {(property.position === 9 ||
                    property.position === 18 ||
                    property.position === 44) &&
                <div className="property-color project-color property-color-government">
                  <h2 className="project-color-h2"> </h2>
                  <div className="property-government-choose">
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
                        onClick={() => setSelectedDepartment("War")}
                        className={"project-div-img" +
                            (selectedDepartment === "War" ? " project-div-img-selected" : "")}>
                      <img
                          src={warDepartmentImg}
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
                </div>}
          </div>
        </div>
    );
  }
  const propertyFirstLevel = property.upgrades.find(
      (upgrade) => upgrade.level === "LEVEL_1"
  );

  const ownedLevels = property.upgrades.filter(
      (upgrade) => upgrade.isOwned && upgrade.level.startsWith("LEVEL")
  );
  const highestOwnedLevel = ownedLevels[ownedLevels.length - 1];

  const propertyHighestLevelInfo = propertiesInfo[property.position][highestOwnedLevel.level];

  lowestNotOwnedLevel = property.upgrades.find(
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
                  +{property.goldPerTurn}
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
          {property.upgrades.map((upgrade, index) => {
            if (!upgrade.level.startsWith("LEVEL_")) {
              return null;
            }
            if (upgrade.level.startsWith("LEVEL_4_")) {
              return null;
            }
            const propertyLevelInfo =
                propertiesInfo[property.position][upgrade.level];
            const upgradeRequirement =
                property.upgradeRequirements.find(
                    (upg) => upg.level === upgrade.level
                );
            const hasFalseRequirement = upgradeRequirement
                ? Object.values(upgradeRequirement.requirements).some((value) => !value) : false;
            const isNextLevel = lowestNotOwnedLevel && upgrade.level === lowestNotOwnedLevel.level;
            return (
                <div
                    key={index}
                    className={
                        "property-modifier-div" +
                        (upgrade.isOwned ? " modifiered" : "") +
                        (((!hasFalseRequirement && isNextLevel && property.mortgage === -1)
                            || upgrade.isOwned) ? " property-div-compleated" : "")
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
                        return sortedRequirements.map(([key, value]) => (
                            <div key={key} className={(value || upgrade.isOwned) ?
                                "condition-p-compleated" : ""}>
                              {requirements[key]}
                            </div>
                        ));
                      })()}
                    </div>
                    <div className="property-new-stats">
                      <div className="property-mini-flex">
                        <p className="property-new-stats-p">
                          cost
                        </p>
                        <div className="player-stat-gold width-full pointer no-select">
                          <img
                              src={goldImg}
                              className="recourse-img"
                              alt="gold"
                          />
                          {upgrade.price}
                        </div>
                      </div>
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
                          {upgrade.goldOnStep +
                              ((property.position === 7 || property.position === 30) ? "x" : "")}
                        </div>
                      </div>
                      {upgrade.tourismOnStep > 0 && <div className="property-mini-flex">
                        <p className="property-new-stats-p">
                          t.o.s
                        </p>
                        <div className="player-stat-tourism width-full no-select">
                          <img
                              src={tourismImg}
                              className="recourse-img"
                              alt="tourism"
                          />
                          {upgrade.tourismOnStep}
                        </div>
                      </div>}
                      {upgrade.goldPerTurn !== 0 && <div className="property-mini-flex">
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
                      </div>}
                    </div>
                  </div>
                  {propertyLevelInfo.info && <InfoBlock info={propertyLevelInfo.info}/>}
                </div>
            );
          })}

          {(property.position === 9 ||
                  property.position === 18 ||
                  property.position === 44) &&
              <div className="property-color project-color property-color-government">
                {!highestOwnedLevel.level.startsWith("LEVEL_4_") && (
                    <>
                      <h2 className="project-color-h2">Choose your building</h2>
                      <div className="property-government-choose">
                        <div
                            onClick={() => setSelectedDepartment("Science")}
                            className={"project-div-img" +
                                (handleUpgradeRequirement(property, "Science")[2] ?
                                    " project-div-img-compleated" : "") +
                                (selectedDepartment === "Science" ? " project-div-img-selected"
                                    : "")}>
                          <img
                              src={scienceDepartmentImg}
                              className="project-img"
                              alt="government"
                          />
                        </div>
                        <div
                            onClick={() => setSelectedDepartment("War")}
                            className={"project-div-img" +
                                (handleUpgradeRequirement(property, "War")[2] ?
                                    " project-div-img-compleated" : "") +
                                (selectedDepartment === "War" ? " project-div-img-selected" : "")}>
                          <img
                              src={warDepartmentImg}
                              className="project-img"
                              alt="government"
                          />
                        </div>
                        <div
                            onClick={() => setSelectedDepartment("Culture")}
                            className={"project-div-img" +
                                (handleUpgradeRequirement(property, "Culture")[2] ?
                                    " project-div-img-compleated" : "") +
                                (selectedDepartment === "Culture" ? " project-div-img-selected"
                                    : "")}>
                          <img
                              src={cultureDepartmentImg}
                              className="project-img"
                              alt="governmentd"
                          />
                        </div>
                      </div>
                    </>
                )}
                {renderDepartmentContent(highestOwnedLevel.level.startsWith("LEVEL_4_") ?
                    departmentByLevel[highestOwnedLevel.level] : selectedDepartment)}
              </div>
          }

          {property.upgrades.find((upgrade) =>
              (upgrade.level.startsWith("WONDER_") || upgrade.level.startsWith("ADJACENCY_"))
              && upgrade.isOwned) && (
              <h2 className="buffs-h">Buffs:</h2>
          )}
          {property.upgrades.find(
              (upgrade) => upgrade.level.startsWith("WONDER_") && upgrade.isOwned) && (
              <>
                {property.upgrades
                .filter((upgrade) => upgrade.level.startsWith("WONDER_") && upgrade.isOwned)
                .map((upgrade, index) => (
                    <div
                        key={index}
                        className="property-modifier-div property-div-compleated modifiered-by-wonder"
                    >
                      <h3 className="property-modifier-h3">{uniqueEffectsInfo[upgrade.level].name}</h3>
                      <div className="property-grid-3">
                        <div className="property-gridimg-img-div">
                          <img
                              src={uniqueEffectsInfo[upgrade.level].src}
                              className="property-img"
                              alt="gold"
                          />
                        </div>
                        {uniqueEffectsInfo[upgrade.level].description}
                        <div className="property-new-stats">
                          <div className="property-mini-flex">
                            <p className="property-new-stats-p">g.o.s</p>
                            <div
                                className="player-stat-gold width-full pointer no-select">
                              <img
                                  src={goldImg}
                                  className="recourse-img"
                                  alt="gold"
                              />
                              {upgrade.goldOnStep}
                            </div>
                          </div>
                          {upgrade.tourismOnStep > 0 && <div className="property-mini-flex">
                            <p className="property-new-stats-p">
                              t.o.s
                            </p>
                            <div className="player-stat-tourism width-full no-select">
                              <img
                                  src={tourismImg}
                                  className="recourse-img"
                                  alt="tourism"
                              />
                              {upgrade.tourismOnStep}
                            </div>
                          </div>}
                          {upgrade.goldPerTurn > 0 && <div className="property-mini-flex">
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
                          </div>}
                        </div>
                      </div>
                    </div>
                ))}
              </>
          )}

          {property.upgrades.find(
              (upgrade) => upgrade.level.startsWith("ADJACENCY_") && upgrade.isOwned) && (
              <>
                {property.upgrades
                .filter((upgrade) => upgrade.level.startsWith("ADJACENCY_") && upgrade.isOwned)
                .map((upgrade, index) => (
                    <div
                        key={index}
                        className="property-modifier-div property-div-compleated neighborhood-bonus modifiered"
                    >
                      <h3 className="property-modifier-h3">{uniqueEffectsInfo[upgrade.level].name}</h3>
                      <div className="property-grid-3">
                        <div className="property-gridimg-img-div">
                          <img
                              src={uniqueEffectsInfo[upgrade.level].src}
                              className="property-img"
                              alt="gold"
                          />
                        </div>
                        {uniqueEffectsInfo[upgrade.level].description}
                        <div className="property-new-stats">
                          <div className="property-mini-flex">
                            <p className="property-new-stats-p">g.o.s</p>
                            <div
                                className="player-stat-gold width-full pointer no-select">
                              <img
                                  src={goldImg}
                                  className="recourse-img"
                                  alt="gold"
                              />
                              {upgrade.goldOnStep}
                            </div>
                          </div>
                          {upgrade.tourismOnStep > 0 && <div className="property-mini-flex">
                            <p className="property-new-stats-p">
                              t.o.s
                            </p>
                            <div className="player-stat-tourism width-full no-select">
                              <img
                                  src={tourismImg}
                                  className="recourse-img"
                                  alt="tourism"
                              />
                              {upgrade.tourismOnStep}
                            </div>
                          </div>}
                          {upgrade.goldPerTurn > 0 && <div className="property-mini-flex">
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
                          </div>}
                        </div>
                      </div>
                    </div>
                ))}
              </>
          )}

          {Cookies.get("username") === property.member.user.username &&
              <div className="proprty-btns-div flex-between">
                {!highestOwnedLevel.level.startsWith("LEVEL_4_") && lowestNotOwnedLevel
                    && property.mortgage === -1 && (
                        <button
                            disabled={
                                !isCurrentUserTurn ||
                                (currentUser.gold < lowestNotOwnedLevel.price ||
                                    (property.upgradeRequirements.length > 0 &&
                                        property.upgradeRequirements.some(
                                            (upg) => upg.level === lowestNotOwnedLevel.level
                                        ) &&
                                        Object.values(
                                            property.upgradeRequirements.find(
                                                (upgrade) =>
                                                    upgrade.level ===
                                                    (lowestNotOwnedLevel.level === "LEVEL_4_1" ?
                                                        levelByDepartment[selectedDepartment] : lowestNotOwnedLevel.level)
                                            ).requirements
                                        ).some((req) => req === false)) ||
                                    ("LEVEL_4_1" === lowestNotOwnedLevel.level &&
                                        !handleUpgradeRequirement(property, selectedDepartment)[2])
                                )}
                            onClick={() => {
                              if ("LEVEL_4_1" === lowestNotOwnedLevel.level) {
                                const selectedDepartmentAsNumber = selectedDepartment === "Science"
                                    ?
                                    1 : selectedDepartment === "War" ? 2 : 3;
                                handleUpgradeProperty(property.position,
                                    selectedDepartmentAsNumber);
                              } else {
                                handleUpgradeProperty(property.position);
                              }
                            }}
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
                            !isCurrentUserTurn ||
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
                          {Math.floor(ownedLevels[0].price * gameSettings.redemptionCoefficient)}
                        </p>
                      </div>
                    </button>
                )}
                {property.mortgage === -1 && (
                    <button
                        disabled={!isCurrentUserTurn}
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
                          {Math.floor(highestOwnedLevel.price *
                              (highestOwnedLevel.level === "LEVEL_1"
                                  ? gameSettings.mortgageGoldCoefficient
                                  : gameSettings.demoteGoldCoefficient))}
                        </p>
                      </div>
                    </button>
                )}
              </div>}
        </div>
      </div>
  );
}
