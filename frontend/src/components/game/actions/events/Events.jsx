import "./styles.css";
import Barbarians from "./barbarians/Barbarians";
import BuyProperty from "./buyProperty/BuyProperty";
import Diplomacy from "./diplomacy/Diplomacy";
import EnemyProperty from "./enemyProperty/EnemyProperty";
import ForeignProperty from "./foreignProperty/ForeignProperty";
import GoodyHut from "./goodyHut/GoodyHut";
import Projects from "./projects/Projects";

export default function Events({
                                   events,
                                   properties,
                                   isCurrentUserTurn,
                                   hasRolledDice,
                                   handleRollDice,
                                   handleBuyProperty,
                                   handlePayRent,
                                   handleEndTurn,
                                   handleSkip
                               }) {

    const renderContent = () => {
        if (!events) return null;
        return events.map((event, index) => {
            const { type, member } = event;
            switch (type) {
                case "BUY_PROPERTY":
                    return (
                        <BuyProperty
                            key={index}
                            property={properties[member.position]}
                            handleBuyProperty={() => handleBuyProperty(member.position)}
                            onSkip={() => handleSkip('BUY_PROPERTY')}
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
                    return <ForeignProperty
                        key={index}
                        property={properties[member.position]}
                        handlePayRent={() => handlePayRent(member.position)}
                        // handleDeclareWar
                    />;
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
