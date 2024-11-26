import "./styles.css";
import goldPerTurnImg from "../../../../../images/icon-gold-per-turn.png";
import goldImg from "../../../../../images/icon-gold.png";
import {propertiesInfo} from "../../../../../constraints";
import Cookies from "js-cookie";
import tourismImg from "../../../../../images/icon-tourism.png";
// import tourismImg from "../../../../../images/icon-tourism.png";

export default function Empire({
  currentUser,
  isCurrentUserTurn,
  selectProperty,
  gameSettings,
  properties,
  handleUpgradeProperty,
  handleDowngradeProperty,
}) {

  return (
      <div className="empireSection">
        {Object.keys(properties).map((key) => {
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
                    <div className="proprty-btns-div flex-between">
                      {!highestOwnedLevel.level.startsWith("LEVEL_4_") && lowestNotOwnedLevel &&
                          property.mortgage === -1 && (
                              <button
                                  disabled={!isCurrentUserTurn ||
                                      (!lowestNotOwnedLevel.level.startsWith("LEVEL_4_") &&
                                      isUpgradeDisabled)}
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
                                      <div
                                          className="player-stat-gold width-full pointer no-select">
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
                              disabled={!isCurrentUserTurn || isRedeemDisabled}
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
                              disabled={!isCurrentUserTurn}
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
