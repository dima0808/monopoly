import "./styles.css";
import Barbarians from "./barbarians/Barbarians";
import BuyProperty from "./buyProperty/BuyProperty";
import Diplomacy from "./diplomacy/Diplomacy";
import EnemyProperty from "./enemyProperty/EnemyProperty";
import ForeignProperty from "./foreignProperty/ForeignProperty";
import GoodyHut from "./goodyHut/GoodyHut";
import Projects from "./projects/Projects";

export default function Events({
    isCurrentUserTurn,
    hasRolledDice,
    handleRollDice,
    handleEndTurn,
}) {
    return (
        <div>
            <div className="events-hole scroll">
                {/*<Barbarians />*/}
                {/*<GoodyHut />*/}
                {/* + */}
                <BuyProperty />
                {/* + */}
                {/* <EnemyProperty /> */}
                {/* + */}
                {/* <ForeignProperty /> */}
                {/*<Projects />*/}
                {/*<Diplomacy />*/}
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
