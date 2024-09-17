import "./styles.css";
import Barbarians from "./barbarians/Barbarians";
import BuyProperty from "./buyProperty/BuyProperty";
import Diplomacy from "./diplomacy/Diplomacy";
import EnemyProperty from "./enemyProperty/EnemyProperty";
import ForeignProperty from "./foreignProperty/ForeignProperty";
import GoodyHut from "./goodyHut/GoodyHut";
import Projects from "./projects/Projects";
import Union from "./union/Union";
import Peace from "./peace/Peace";

export default function Events({
    players,
    events,
    properties,
    isCurrentUserTurn,
    hasRolledDice,
    handleRollDice,
    handleBuyProperty,
    handlePayRent,
    handleEndTurn,
    handleSkip,
}) {
    const renderContent = () => {
        if (!events) return null;
        return events.map((event, index) => {
            const { type, member } = event;
            switch (type) {
                case "BUY_PROPERTY":
                    if (!properties[member.position]) return null;
                    return (
                        <BuyProperty
                            key={index}
                            member={players.find(
                                (player) => player.id === member.id
                            )}
                            property={properties[member.position]}
                            handleBuyProperty={() =>
                                handleBuyProperty(member.position)
                            }
                            onSkip={() => handleSkip("BUY_PROPERTY")}
                        />
                    );
                case "PROJECTS":
                    return <Projects key={index} />;
                case "BARBARIANS":
                    return <Barbarians key={index} />;
                case "DIPLOMACY":
                    return <Diplomacy key={index} />;
                case "ENEMY_PROPERTY":
                    return <EnemyProperty key={index} />;
                case "FOREIGN_PROPERTY":
                    if (!properties[member.position]) return null;
                    return (
                        <ForeignProperty
                            key={index}
                            property={properties[member.position]}
                            handlePayRent={() => handlePayRent(member.position)}
                            onSkip={() => handleSkip("FOREIGN_PROPERTY")}
                            // handleDeclareWar
                        />
                    );
                case "GOODY_HUT":
                    return <GoodyHut key={index} />;
                default:
                    return null;
            }
        });
    };

    return (
        <div>
            <div className="events-hole scrollable-div">
                <Peace />
                <Union />
                {/*<Barbarians />*/}
                {/*<GoodyHut />*/}
                {/* + */}
                {/*<BuyProperty/>*/}
                {/* + */}
                {/* <EnemyProperty /> */}
                {/* + */}
                {/* <ForeignProperty /> */}
                {/*<Projects />*/}
                {/*<Diplomacy />*/}
                {renderContent()}
            </div>
            <div className="div-btn-turn-and-roll ">
                {isCurrentUserTurn && (
                    <button
                        className="  btn-turn-and-roll"
                        onClick={hasRolledDice ? handleEndTurn : handleRollDice}
                        disabled={events.length > 0}
                    >
                        {hasRolledDice ? "End turn" : "Roll"}
                    </button>
                )}
            </div>
        </div>
    );
}
