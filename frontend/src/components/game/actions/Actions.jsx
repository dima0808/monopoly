import {useCallback, useEffect, useState} from "react";
import "./styles.css";
import Cookies from "js-cookie";

import goldImg from "../../../images/icon-gold.png";
import strengthImg from "../../../images/icon-strength.png";
import Events from "./events/Events";
import Management from "./management/Management";
import {getAllEvents} from "../../../utils/http";

export default function Actions({
                                    room, players, properties,
                                    activeTab, setActiveTab,
                                    selectedProperty, setSelectedProperty,
                                    client, isConnected,
                                    setNotifications
                                }) {

    const [armySpending, setArmySpending] = useState("Default");
    const [error, setError] = useState(null);

    const [events, setEvents] = useState([]);

    const [managementActiveTab, setManagementActiveTab] = useState("Empire");

    const [calculatedGoldPerTurn, setCalculatedGoldPerTurn] = useState(0);

    const isCurrentUserTurn = room.isStarted && room.currentTurn === Cookies.get("username");
    const currentUser = players.find((player) => player.user.username === Cookies.get("username"));
    const hasRolledDice = currentUser && currentUser.hasRolledDice;

    const handleRollDice = useCallback(() => {
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
                destination: `/app/rooms/${room.name}/rollDice`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Rolling dice...");
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

    const handleUpgradeProperty = (position) => {
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
                destination: `/app/rooms/${room.name}/upgradeProperty/${position}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
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
    }

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
        const {type, content, event} = JSON.parse(message.body);
        console.log(content);
        switch (type) {
            case 'ADD_EVENT':
                setEvents((prev) => [...prev, event]);
                return;
            case 'DELETE_EVENT':
                setEvents((prev) => prev.filter((e) => e.type !== event.type));
                return;
            default:
                return;
        }
    }
    
    useEffect(() => {
        if (currentUser?.gold < 700 && armySpending === "High") {
            setArmySpending("Medium");
        } else if (currentUser?.gold < 200 && armySpending === "Medium") {
            setArmySpending("Default");
        }
    }, [armySpending, currentUser]);

    useEffect(() => {
        if (client && isConnected) {
            const username = Cookies.get("username");
            getAllEvents(username).then(setEvents)
                .catch((error) => setError({message: error.message || "An error occurred"}));
            const eventsSubscription = client.subscribe("/user/" + username + "/queue/events", onEventReceived);
            return () => {
                eventsSubscription.unsubscribe();
            };
        }
    }, [client, isConnected]);

    useEffect(() => {
        if (isCurrentUserTurn && !hasRolledDice) {
            const timerId = setTimeout(() => {
                handleRollDice();
                localStorage.removeItem('diceRollTimer');
            }, 5000);

            localStorage.setItem('diceRollTimer', timerId);

            return () => {
                clearTimeout(timerId);
                localStorage.removeItem('diceRollTimer');
            };
        }
    }, [isCurrentUserTurn, hasRolledDice, handleRollDice]);

    useEffect(() => {
        const timerId = localStorage.getItem('diceRollTimer');
        if (timerId && client && isConnected) {

            handleRollDice();
            localStorage.removeItem('diceRollTimer');
        }
    }, [client, isConnected, handleRollDice]);

    const renderContent = () => {
        switch (activeTab) {
            case "Events":
                return (
                    <Events
                        players={players}
                        events={events}
                        properties={properties}
                        handleRollDice={handleRollDice}
                        handleBuyProperty={handleBuyProperty}
                        handlePayRent={handlePayRent}
                        handleSkip={handleSkip}
                        handleEndTurn={handleEndTurn}
                        isCurrentUserTurn={isCurrentUserTurn}
                        hasRolledDice={hasRolledDice}
                    />
                );
            case "Management":
                return <Management
                    currentUser={currentUser}
                    properties={properties}
                    managementActiveTab={managementActiveTab} setManagementActiveTab={setManagementActiveTab}
                    selectedProperty={selectedProperty} setSelectedProperty={setSelectedProperty}
                    handleUpgradeProperty={handleUpgradeProperty}
                />;
            default:
                return null;
        }
    };

    const checkArmySpending = (type) => {
        setArmySpending(type);
    };

    useEffect(() => {
        if (properties) {
            const userProperties = Object.values(properties).filter(property =>
                property.member && property.member.user.username === Cookies.get('username')
            );

            const totalGoldPerTurn = userProperties.reduce((sum, property) => {
                return sum + (property.goldPerTurn || 0);
            }, 0);

            setCalculatedGoldPerTurn(totalGoldPerTurn);
        }
    }, [properties]);

    return (
        <section className="actions">
            {/*<SettingsDialog/>*/}
            <div className="static-choises">
                <div className="flex-between top-flex">
                    <div className="value">
                        <h2>Gold per turn:</h2>
                        <div onClick={() => {
                            setActiveTab('Management');
                            setManagementActiveTab('Cashflow');
                        }}
                             className="player-stat-gold gold-per-turn width-full pointer no-select">
                            <img
                                src={goldImg}
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
                    <li
                        onClick={() => checkArmySpending("Absent")}
                        className={`li-army-gold 
                        ${armySpending === "Absent" ? "selected-military" : ""}
                        `}
                    >
                        <div className="player-stat-strength no-select">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            -50
                        </div>
                        <div className="player-stat-gold no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            +30
                        </div>
                    </li>
                    <li
                        onClick={() => checkArmySpending("Default")}
                        className={`li-army-gold ${
                            armySpending === "Default"
                                ? "selected-military"
                                : ""
                        }`}
                    >
                        <div className="player-stat-strength no-select ">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            +10
                        </div>
                        <div className="player-stat-gold no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            0
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            if (currentUser?.gold >= 200) {
                                checkArmySpending("Medium");
                            }
                        }}
                        className={`li-army-gold 
                        ${armySpending === "Medium" ? "selected-military" : ""}
                        ${currentUser?.gold < 200 ? "li-army-gold-disabled" : ""}
                        `}
                    >
                        <div className="player-stat-strength no-select">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            +100
                        </div>
                        <div className="player-stat-gold no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            -200
                        </div>
                    </li>
                    <li
                        onClick={() => {
                            if (currentUser?.gold >= 700) {
                                checkArmySpending("High");
                            }
                        }}
                        className={`li-army-gold 
                        ${armySpending === "High" ? "selected-military" : ""}
                        ${currentUser?.gold < 700 ? "li-army-gold-disabled" : ""}
                        `}
                    >
                        <div className="player-stat-strength no-select">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            +250
                        </div>
                        <div className="player-stat-gold no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            -700
                        </div>
                    </li>
                </ul>
                <div className="flex-between management-btns">
                    <button onClick={() => {
                        setActiveTab('Management');
                        setManagementActiveTab('Relations');
                    }} className="management-btn">
                        Relations
                    </button>
                    <button onClick={() => {
                        setActiveTab('Management');
                        setManagementActiveTab('Empire');
                    }} className="management-btn">
                        Empire
                    </button>
                    <button onClick={() => {
                        setActiveTab('Management');
                        setManagementActiveTab('Wins');
                    }} className="management-btn">
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
                    {!error && <div className="chousen-div-white">{renderContent()}</div>}
                    {error && <p>{error.message}</p>}
                </div>
            </div>
        </section>
    );
}
