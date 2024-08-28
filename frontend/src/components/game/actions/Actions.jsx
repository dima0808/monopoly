import {useCallback, useEffect, useState} from "react";
import './styles.css';
import Cookies from "js-cookie";

import goldImg from "../../../images/icon-gold.png";
import strengthImg from "../../../images/icon-strength.png";
import Events from "./Events";
import Management from "./Management";

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
            case 'Events':
                return <Events handleRollDice={handleRollDice} handleEndTurn={handleEndTurn}
                               isCurrentUserTurn={isCurrentUserTurn} hasRolledDice={hasRolledDice}/>;
            case 'Management':
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
            <div className="static-choises">
                <div className="flex-between top-flex">
                    <div className="value">
                        <h2>Value per turn:</h2>
                        <div className="player-stat-gold no-select">
                            <img src={goldImg} className="recourse-img" alt="gold"/>
                            +34
                        </div>
                    </div>
                    <button className="satings-btn">S</button>
                </div>
                <h2 className="military-economic-h2">Військова економіка:</h2>
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