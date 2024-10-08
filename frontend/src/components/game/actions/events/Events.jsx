import "./styles.css";
import Barbarians from "./barbarians/Barbarians";
import BuyProperty from "./buyProperty/BuyProperty";
import Diplomacy from "./diplomacy/Diplomacy";
import EnemyProperty from "./enemyProperty/EnemyProperty";
import ForeignProperty from "./foreignProperty/ForeignProperty";
import GoodyHut from "./goodyHut/GoodyHut";
import Projects from "./projects/Projects";

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
                                   handleChoice,
                                   handleSkip,
                               }) {

    const renderContent = () => {
        if (!events) return null;
        return events.map((event, index) => {
            const {type, member, roll} = event;
            if (/^GOODY_HUT_/.test(type)) {
                return <GoodyHut key={index} type={type} handleChoice={(choice) => handleChoice(type, choice)}/>;
            }
            if (/^BARBARIANS_/.test(type)) {
                return <Barbarians key={index} type={type} handleChoice={(choice) => handleChoice(type, choice)}/>;
            }
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
                    return <Projects key={index}/>;
                case "DIPLOMACY":
                    return <Diplomacy key={index}/>;
                case "ENEMY_PROPERTY":
                    return <EnemyProperty key={index}/>;
                case "FOREIGN_PROPERTY":
                    if (!properties[member.position]) return null;
                    return (
                        <ForeignProperty
                            key={index}
                            property={properties[member.position]}
                            member={players.find(
                                (player) => player.id === member.id
                            )}
                            roll={roll}
                            handlePayRent={() => handlePayRent(member.position)}
                            onSkip={() => handleSkip("FOREIGN_PROPERTY")}
                            // handleDeclareWar
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div>
            <div className="events-hole scrollable-div">
                {/* <Peace /> */}
                {/* <Union /> */}
                {/* <Barbarians /> */}
                {/* <GoodyHut /> */}
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
