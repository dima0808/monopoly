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
                                   isCurrentUserTurn,
                                   hasRolledDice,
                                   handleRollDice,
                                   handleBuyProperty,
                                   handleEndTurn,
                                   onSkip
                               }) {

    const renderContent = () => {
        return events.map((event, index) => {
            const { type, property } = event;
            switch (type) {
                case "BUY_PROPERTY":
                    return (
                        <BuyProperty
                            key={index}
                            property={property}
                            handleBuyProperty={handleBuyProperty}
                            onSkip={() => onSkip('BUY_PROPERTY')}
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
                    return <ForeignProperty key={index} />;
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
                    >
                        {hasRolledDice ? "End turn" : "Roll"}
                    </button>
                )}
            </div>
        </div>
    );
}
