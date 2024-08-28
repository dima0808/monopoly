import {useCallback, useEffect, useState} from "react";
import './styles.css';
import Cookies from "js-cookie";

import goldImg from "../../../images/icon-gold.png";
import strengthImg from "../../../images/icon-strength.png";
import Events from "./events/Events";
import Management from "./management/Management";
import SettingsDialog from "./SettingsDialog";

export default function Actions({room, players, client, setNotifications}) {
    const [activeTab, setActiveTab] = useState('Events');
    const [armySpending, setArmySpending] = useState('Default');

    const isCurrentUserTurn = room.isStarted && room.currentTurn === Cookies.get("username");
    const currentUser = players.find((player) => player.user.username === Cookies.get("username"));
    const hasRolledDice = currentUser && currentUser.hasRolledDice;

    const handleRollDice = useCallback(() => {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
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

    const handleEndTurn = useCallback(() => {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
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
                destination: `/app/rooms/${room.name}/endTurn`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
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
    }, [client, room.name, setNotifications]);

    useEffect(() => {
        if (isCurrentUserTurn && !hasRolledDice) {
            const timer = setTimeout(() => {
                handleRollDice();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isCurrentUserTurn, hasRolledDice, handleRollDice]);

    const renderContent = () => {
        switch (activeTab) {
            case "Events":
                return (
                    <Events
                        handleRollDice={handleRollDice}
                        handleEndTurn={handleEndTurn}
                        isCurrentUserTurn={isCurrentUserTurn}
                        hasRolledDice={hasRolledDice}
                    />
                );
            case "Management":
                return <Management/>;
            default:
                return null;
        }
    }

    const checkArmySpending = (type) => {
        setArmySpending(type);
    }

    return (
        <section className="actions">
            {/*<SettingsDialog/>*/}
            <div className="static-choises">
                <div className="flex-between top-flex">
                    <div className="value">
                        <h2>Value per turn:</h2>
                        <div className="player-stat-gold no-select">
                            <img src={goldImg} className="recourse-img" alt="gold"/>
                            +34
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
                    <li onClick={() => checkArmySpending('Absent')}
                        className={`li-army-gold ${armySpending === 'Absent' ? 'selected-military' : ''}`}>
                        <div className="player-stat-strength no-select">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            -50
                        </div>
                        <div className="player-stat-gold no-select">
                            <img src={goldImg} className="recourse-img" alt="gold"/>
                            +30
                        </div>
                    </li>
                    <li onClick={() => checkArmySpending('Default')}
                        className={`li-army-gold ${armySpending === 'Default' ? 'selected-military' : ''}`}>
                        <div className="player-stat-strength no-select ">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            +10
                        </div>
                        <div className="player-stat-gold no-select">
                            <img src={goldImg} className="recourse-img" alt="gold"/>
                            0
                        </div>
                    </li>
                    <li onClick={() => checkArmySpending('Medium')}
                        className={`li-army-gold ${armySpending === 'Medium' ? 'selected-military' : ''}`}>
                        <div className="player-stat-strength no-select">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            +100
                        </div>
                        <div className="player-stat-gold no-select">
                            <img src={goldImg} className="recourse-img" alt="gold"/>
                            -200
                        </div>
                    </li>
                    <li onClick={() => checkArmySpending('High')}
                        className={`li-army-gold ${armySpending === 'High' ? 'selected-military' : ''}`}>
                        <div className="player-stat-strength no-select">
                            <img
                                src={strengthImg}
                                className="recourse-img strength-recourse-img"
                                alt="strength"
                            />
                            +250
                        </div>
                        <div className="player-stat-gold no-select">
                            <img src={goldImg} className="recourse-img" alt="gold"/>
                            -700
                        </div>
                    </li>
                </ul>
                <div className="flex-between management-btns">
                    <button className="management-btn">Relations</button>
                    <button className="management-btn">Empire</button>
                    <button className="management-btn">Wins</button>
                </div>
            </div>
            <div className="not-static-choises">
                <div className="not-static-choises-checkbox">
                    <button
                        onClick={() => setActiveTab('Events')}
                        className={`not-static-btn ${activeTab === 'Events' ? 'selected-static-btn' : ''}`}
                    >
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab('Management')}
                        className={`not-static-btn ${activeTab === 'Management' ? 'selected-static-btn' : ''}`}
                    >
                        Management
                    </button>
                </div>
                <div className="chousen-div">
                    <div className="chousen-div-white scroll">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </section>
    );
}
