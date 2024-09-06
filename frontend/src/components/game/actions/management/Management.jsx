import "./styles.css";

import Cashflow from "./cashflow/Cashflow";
import Empire from "./empire/Empire";
import LeaderAbilities from "./leaderAbilities/LeaderAbilities";
import PlayerInfo from "./playerInfo/PlayerInfo";
import Property from "./property/Property";
import Relations from "./relations/Relations";
import Wins from "./wins/Wins";

export default function Management({
                                       properties,
                                       managementActiveTab, setManagementActiveTab,
                                       selectedProperty, setSelectedProperty
                                   }) {

    const renderContent = () => {
        switch (managementActiveTab) {
            case "Cashflow":
                return <Cashflow />;
            case "Empire":
                return <Empire properties={properties} />;
            case "Leader Abilities":
                return <LeaderAbilities />;
            case "Player Info":
                return <PlayerInfo />;
            case "Property":
                return <Property />;
            case "Relations":
                return <Relations />;
            case "Wins":
                return <Wins />;
            default:
                return null;
        }
    }

    return (
        <div className="management-hole scrollable-div">
            {/* <Cashflow /> */}
            {/* <Empire /> */}
            {/*<LeaderAbilities />*/}
            {/*<PlayerInfo />*/}
            {/*<Property/>*/}
            {/*<Relations />*/}
            {/*<Wins />*/}
            {renderContent()}
        </div>
    );
}
