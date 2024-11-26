import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import Cookies from "js-cookie";

import goldImg from "../../../images/icon-gold.png";
import goldPerTurnImg from "../../../images/icon-gold-per-turn.png";
import strengthImg from "../../../images/icon-strength.png";
import Events from "./events/Events";
import Management from "./management/Management";
import { getAllEvents, getGameSettings } from "../../../utils/http";
import SettingsDialog from "../actions/SettingsDialog";
import GameWinnerDialog from "../actions/GameWinnerDialog";
import GamePauseDialog from "../actions/GamePauseDialog";
import {handleLeaveRoom} from "../../../utils/lobby";
export default function Actions({
    room,
    players,
    setPlayers,
    properties,
    additionalEffects,
    activeTab,
    setActiveTab,
    selectedProperty,
    setSelectedProperty,
    client,
    isConnected,
    managementActiveTab,
    setManagementActiveTab,
    setNotifications,
}) {
    const [armySpending, setArmySpending] = useState("Default");
    const [error, setError] = useState(null);

    const [events, setEvents] = useState([]);
    const [isEventsDeleted, setIsEventsDeleted] = useState(false);
    const [gameSettings, setGameSettings] = useState({});

    const [calculatedGoldPerTurn, setCalculatedGoldPerTurn] = useState(0);

    const isCurrentUserTurn =
        room.isStarted && room.currentTurn === Cookies.get("username");
    const currentUser = players.find(
        (player) => player.user.username === Cookies.get("username")
    );
    const hasRolledDice = currentUser && currentUser.hasRolledDice;

    const [availableUpgrades, setAvailableUpgrades] = useState(false);

    const handleRollDice = useCallback(() => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/rollDice`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Rolling dice...");
            localStorage.setItem("diceRollTimer", 5000);
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error rolling dice (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    }, [client, room.name, setNotifications]);

    const handleForcedEndTurn = useCallback(() => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/forceEndTurn`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                    armySpending: armySpending,
                },
            });
            console.log("Forcing end turn...");
            localStorage.setItem("endTurnTimer", 90000);
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error forcing end turn (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    }, [client, room.name, setNotifications]);

    const handleBuyProperty = (position) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/buyProperty/${position}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Buying property...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error buying property (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleUpgradeProperty = (position, governmentPlazaChoice = -1) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/upgrade${
                    governmentPlazaChoice === -1
                        ? "Property"
                        : "GovernmentPlazaChoice"
                }/${position}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                    choice:
                        governmentPlazaChoice === -1
                            ? null
                            : "LEVEL_4_" + governmentPlazaChoice,
                },
            });
            console.log("Upgrading property...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error upgrading property (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleDowngradeProperty = (position) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/downgradeProperty/${position}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Downgrading property...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error downgrading property (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handlePayRent = (position) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/payRent/${position}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Paying rent...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error paying rent (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleChoice = (eventType, choice) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/members/${username}/makeChoice/${eventType}/${choice}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Handling event choice...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error handling event choice (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleProjectChoice = (selectedProject) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/members/${username}/makeProjectChoice/${selectedProject}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Handling event choice...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error handling event choice (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleScienceProject = () => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/members/${username}/doScienceProject`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Handling science project...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error handling science project (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleConcert = () => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/members/${username}/doConcert`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Handling concert...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error handling concert (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleSkip = (eventType) => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/members/${username}/deleteEvent/${eventType}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Skipping event...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error skipping event (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    };

    const handleEndTurn = useCallback(() => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        if (!client || !client.publish) {
            setNotifications((prev) => [
                ...prev,
                {
                    message:
                        "Client is not initialized or publish method is not available",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/endTurn`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                    armySpending: armySpending,
                },
            });
            console.log("Ending turn...");
            localStorage.setItem("endTurnTimer", 90000);
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error ending turn (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    }, [armySpending, client, room.name, setNotifications]);

    const onEventReceived = (message) => {
        const { type, content, event } = JSON.parse(message.body);
        console.log(content);
        switch (type) {
            case "ADD_EVENT":
                setEvents((prev) => [...prev, event]);
                return;
            case "DELETE_EVENT":
                setEvents((prev) => prev.filter((e) => e.type !== event.type));
                if (event.type !== "BERMUDA") {
                    setPlayers((prev) =>
                        prev.map((player) => {
                            return player.user.username ===
                                event.member.user.username
                                ? event.member
                                : player;
                        })
                    );
                }
                return;
            case "DELETE_ALL_EVENTS":
                setIsEventsDeleted(true);
                setEvents([]);
                return;
            default:
                return;
        }
    };

    useEffect(() => {
        if (gameSettings.armySpendings) {
            if (currentUser?.gold < 700 && armySpending === "High") {
                setArmySpending("Medium");
            } else if (
                (currentUser?.gold < 200 && armySpending === "Medium") ||
                (currentUser?.strength < 50 && armySpending === "Absent")
            ) {
                setArmySpending("Default");
            }
        }
    }, [armySpending, currentUser, gameSettings]);

    useEffect(() => {
        if (client && isConnected) {
            const username = Cookies.get("username");
            getAllEvents(username)
                .then((events) => {
                    if (!isEventsDeleted) {
                        setEvents(events);
                    } else {
                        setEvents([]);
                    }
                })
                .catch((error) =>
                    setError({ message: error.message || "An error occurred" })
                );
            const eventsSubscription = client.subscribe(
                "/user/" + username + "/queue/events",
                onEventReceived
            );
            return () => {
                eventsSubscription.unsubscribe();
            };
        }
    }, [client, isConnected, isEventsDeleted]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            saveTimers();
        };
        const storedDiceTimer = localStorage.getItem("diceRollTimer") || 5000;
        const storedEndTurnTimer = localStorage.getItem("endTurnTimer") || 90000;

        const saveTimers = () => {
            const currentTime = Date.now();
            if (isCurrentUserTurn && !hasRolledDice) {
                const elapsed = currentTime - startTime;
                const remainingTime = Math.max(storedDiceTimer - elapsed, 0);
                localStorage.setItem("diceRollTimer", remainingTime);
            } else if (isCurrentUserTurn && hasRolledDice) {
                const elapsed = currentTime - startTime;
                const remainingTime = Math.max(storedEndTurnTimer - elapsed, 0);
                localStorage.setItem("endTurnTimer", remainingTime);
            }
        };

        let startTime;
        let timerId;

        if (isCurrentUserTurn && !hasRolledDice) {
            startTime = Date.now();
            timerId = setTimeout(() => {
                handleRollDice();
            }, storedDiceTimer);
        } else if (isCurrentUserTurn && hasRolledDice) {
            startTime = Date.now();
            timerId = setTimeout(() => {
                handleForcedEndTurn();
            }, storedEndTurnTimer);
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            clearTimeout(timerId);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isCurrentUserTurn, hasRolledDice, handleRollDice, handleForcedEndTurn]);

    useEffect(() => {
        getGameSettings()
            .then(setGameSettings)
            .catch((error) =>
                setError({ message: error.message || "An error occurred" })
            );
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        const hasAvailableUpgrades = Object.keys(properties).some((key) => {
            const property = properties[key];
            if (
                !(
                    property.member &&
                    property.member.user.username === currentUser.user.username
                )
            ) {
                return false;
            }
            const lowestNotOwnedLevel = property.upgrades.find(
                (upgrade) =>
                    !upgrade.isOwned && upgrade.level.startsWith("LEVEL")
            );

            if (!lowestNotOwnedLevel) return false;

            const ownedLevels = property.upgrades.filter(
                (upgrade) =>
                    upgrade.isOwned && upgrade.level.startsWith("LEVEL")
            );
            const isRedeemDisabled =
                property.mortgage === -1 ||
                currentUser.gold <
                    Math.floor(
                        ownedLevels[0].price *
                            gameSettings.redemptionCoefficient
                    );

            if (!isRedeemDisabled) return true;

            const isUpgradeDisabled =
                currentUser.gold < lowestNotOwnedLevel?.price ||
                (property.upgradeRequirements.length > 0 &&
                    property.upgradeRequirements.some(
                        (upg) => upg.level === lowestNotOwnedLevel?.level
                    ) &&
                    Object.values(
                        property.upgradeRequirements.find(
                            (upgrade) =>
                                upgrade.level === lowestNotOwnedLevel?.level
                        ).requirements
                    ).some((req) => req === false));

            return !isUpgradeDisabled;
        });

        setAvailableUpgrades(hasAvailableUpgrades);
    }, [properties, currentUser]);

    const renderContent = () => {
        switch (activeTab) {
            case "Events":
                return (
                    <Events
                        room={room}
                        gameSettings={gameSettings}
                        players={players}
                        events={events}
                        properties={properties}
                        handleRollDice={handleRollDice}
                        handleBuyProperty={handleBuyProperty}
                        handlePayRent={handlePayRent}
                        handleChoice={handleChoice}
                        handleProjectChoice={handleProjectChoice}
                        handleScienceProject={handleScienceProject}
                        handleConcert={handleConcert}
                        handleSkip={handleSkip}
                        handleEndTurn={handleEndTurn}
                        isCurrentUserTurn={isCurrentUserTurn}
                        hasRolledDice={hasRolledDice}
                    />
                );
            case "Management":
                return (
                    <Management
                        gameSettings={gameSettings}
                        players={players}
                        currentUser={currentUser}
                        isCurrentUserTurn={isCurrentUserTurn}
                        properties={properties}
                        additionalEffects={additionalEffects}
                        managementActiveTab={managementActiveTab}
                        setManagementActiveTab={setManagementActiveTab}
                        selectedProperty={selectedProperty}
                        setSelectedProperty={setSelectedProperty}
                        handleUpgradeProperty={handleUpgradeProperty}
                        handleDowngradeProperty={handleDowngradeProperty}
                    />
                );
            default:
                return null;
        }
    };

    const checkArmySpending = (type) => {
        setArmySpending(type);
    };

    useEffect(() => {
        if (properties) {
            const userProperties = Object.values(properties).filter(
                (property) =>
                    property.member &&
                    property.member.user.username === Cookies.get("username")
            );

            let totalGoldPerTurn = userProperties.reduce((sum, property) => {
                return sum + (property.goldPerTurn || 0);
            }, 0);

            additionalEffects.forEach((effect) => {
                totalGoldPerTurn += effect.goldPerTurn;
            });

            setCalculatedGoldPerTurn(totalGoldPerTurn);
        }
    }, [properties]);

    return (
        <section className="actions">
            {/* <SettingsDialog /> */}

            {/*<GamePauseDialog />*/}
            {room.winner &&
                <GameWinnerDialog
                    handleLeaveRoom={() => {handleLeaveRoom(room.name, client, setNotifications)}}
                    winner={room.winner}
                    victoryType={room.victoryType}
                    players={players}
                />}
            <div className="static-choises">
                <div className="flex-between top-flex">
                    <div className="value">
                        <h2>Gold per turn:</h2>
                        <div
                            onClick={() => {
                                setActiveTab("Management");
                                setManagementActiveTab("Cashflow");
                            }}
                            className="player-stat-gold gold-per-turn width-full pointer no-select"
                        >
                            <img
                                src={goldPerTurnImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +{calculatedGoldPerTurn}
                        </div>
                    </div>
                    <button className="satings-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="satings-btn-svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </button>
                </div>
                <h2 className="military-economic-h2">Army spending:</h2>
                <ul className="military-economic">
                    {gameSettings.armySpendings &&
                        gameSettings.armySpendings.map((spending, key) => (
                            <li
                                key={key}
                                onClick={() =>
                                    checkArmySpending(spending.armySpending)
                                }
                                className={`li-army-gold 
                                    ${
                                        armySpending === spending.armySpending
                                            ? "selected-military"
                                            : ""
                                    }
                                    ${
                                        currentUser?.gold < -spending.gold ||
                                        currentUser?.strength <
                                            -spending.strength
                                            ? "li-army-gold-disabled"
                                            : ""
                                    }
                                `}
                            >
                                <div className="player-stat-strength no-select">
                                    <img
                                        src={strengthImg}
                                        className="recourse-img strength-recourse-img"
                                        alt="strength"
                                    />
                                    {(spending.strength > 0 ? "+" : "") +
                                        spending.strength}
                                </div>
                                <div className="player-stat-gold no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    {(spending.gold > 0 ? "+" : "") +
                                        spending.gold}
                                </div>
                            </li>
                        ))}
                </ul>
                <div className="flex-between management-btns">
                    {/*<button*/}
                    {/*    onClick={() => {*/}
                    {/*        setActiveTab("Management");*/}
                    {/*        setManagementActiveTab("Relations");*/}
                    {/*    }}*/}
                    {/*    className="management-btn"*/}
                    {/*>*/}
                    {/*    Relations*/}
                    {/*</button>*/}
                    <button
                        onClick={() => {
                            setActiveTab("Management");
                            setManagementActiveTab("Empire");
                        }}
                        className={
                            "management-btn" +
                            (availableUpgrades ? " available-upgrade" : "")
                        }
                    >
                        Empire
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("Management");
                            setManagementActiveTab("Wins");
                        }}
                        className="management-btn"
                    >
                        Wins
                    </button>
                </div>
            </div>
            <div className="not-static-choises">
                <div className="not-static-choises-checkbox">
                    <button
                        onClick={() => setActiveTab("Events")}
                        className={`not-static-btn ${
                            activeTab === "Events" ? "selected-static-btn" : ""
                        }`}
                    >
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab("Management")}
                        className={`not-static-btn ${
                            activeTab === "Management"
                                ? "selected-static-btn"
                                : ""
                        }`}
                    >
                        Management
                    </button>
                </div>
                <div className="chousen-div">
                    {!error && (
                        <div className="chousen-div-white">
                            {renderContent()}
                        </div>
                    )}
                    {error && <p>{error.message}</p>}
                </div>
            </div>
        </section>
    );
}
