import "./styles.css";

import Cashflow from "./cashflow/Cashflow";
import Empire from "./empire/Empire";
import LeaderAbilities from "./leaderAbilities/LeaderAbilities";
import PlayerInfo from "./playerInfo/PlayerInfo";
import Property from "./property/Property";
import Relations from "./relations/Relations";
import Victories from "./victories/Victories";

export default function Management() {
    return (
        <div className="management-hole scrollable-div">
            {/* + */}
            {/* <Cashflow /> */}
            {/* <Empire /> */}
            <LeaderAbilities />
            {/*<PlayerInfo />*/}
            {/* + */}
            <Property />
            {/*<Relations />*/}
            {/*<Victories />*/}
        </div>
    );
}
