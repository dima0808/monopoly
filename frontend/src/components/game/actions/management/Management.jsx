import "./styles.css";

import Cashflow from "./cashflow/Cashflow";
import Empire from "./empire/Empire";
import LeaderAbilities from "./leaderAbilities/LeaderAbilities";
import PlayerInfo from "./playerInfo/PlayerInfo";
import Property from "./property/Property";
import Relations from "./relations/Relations";
import Wins from "./wins/Wins";

export default function Management({
    currentUser,
    isCurrentUserTurn,
    players,
    properties,
    additionalEffects,
    gameSettings,
    managementActiveTab,
    setManagementActiveTab,
    selectedProperty,
    setSelectedProperty,
    handleUpgradeProperty,
    handleDowngradeProperty,
}) {
    const renderContent = () => {
        switch (managementActiveTab) {
            case "Cashflow":
                return <Cashflow additionalEffects={additionalEffects} properties={properties} />;
            case "Empire":
                return (
                    <Empire
                        currentUser={currentUser}
                        isCurrentUserTurn={isCurrentUserTurn}
                        properties={properties}
                        gameSettings={gameSettings}
                        selectProperty={(position) => {
                            setSelectedProperty(position);
                            setManagementActiveTab("Property");
                        }}
                        handleUpgradeProperty={(position) =>
                            handleUpgradeProperty(position)
                        }
                        handleDowngradeProperty={(position) =>
                            handleDowngradeProperty(position)
                        }
                    />
                );
            case "Leader Abilities":
                return <LeaderAbilities />;
            case "Player Info":
                return <PlayerInfo />;
            case "Property":
                return (
                    <Property
                        currentUser={currentUser}
                        isCurrentUserTurn={isCurrentUserTurn}
                        property={selectedProperty}
                        gameSettings={gameSettings}
                        handleUpgradeProperty={handleUpgradeProperty}
                        handleDowngradeProperty={(position) =>
                            handleDowngradeProperty(position)
                        }
                    />
                );
            case "Relations":
                return <Relations />;
            case "Wins":
                return <Wins
                    players={players}
                    properties={properties}
                    cultureThreshold={gameSettings.cultureThreshold}
                />;
            default:
                return null;
        }
    };

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
