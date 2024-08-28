import React, {useEffect} from "react";
import Player from "./Player";
import "./styles.css";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {handleDeleteRoom, handleKickMember, handleLeaveRoom, isUserLeaderCookies} from "../../../utils/lobby";

const colors = ["red", "blue", "green", "yellow", "turquoise", "orange", "pink", "violet",];
const civs = ["Random", "Colombia", "Egypt", "Germany", "Japan", "Korea", "Rome", "Sweden",];

export default function PlayerList({
                                       client,
                                       isConnected,
                                       room,
                                       onStartGame,
                                       players,
                                       setPlayers,
                                       setNotifications,
                                   }) {
    const navigate = useNavigate();

    function onPlayerMessageReceived(message) {
        const {type, content, room, member} = JSON.parse(message.body);
        console.log(content);
        setPlayers((prevPlayers) => {
            switch (type) {
                case "JOIN":
                case "LEAVE":
                case "KICK":
                    return room.members;
                case "DELETE":
                    return [];
                case "CHANGE_CIVILIZATION":
                case "CHANGE_COLOR":
                    return prevPlayers.map((player) =>
                        player.id === member.id ? member : player
                    );
                default:
                    return prevPlayers;
            }
        });
    }

    useEffect(() => {
        if (client && isConnected) {
            const subscription = client.subscribe(
                "/topic/public/" + room.name + "/players",
                onPlayerMessageReceived
            );
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [client, isConnected, room]);

    function handleChangeCivilization(civilization) {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/changeCivilization/${civilization}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log(
                "Changing civilization for " + username + " to " + civilization + "..."
            );
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error changing civilization (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    }

    function handleChangeColor(color) {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        try {
            client.publish({
                destination: `/app/rooms/${room.name}/changeColor/${color}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
            });
            console.log("Changing color for " + username + " to " + color + "...");
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error changing color (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    }

    function getAvailableColors() {
        const selectedColors = players.map((p) => p.color);
        return colors.filter((color) => !selectedColors.includes(color));
    }

    function getAvailableCivs() {
        const selectedCivs = players.map((p) => p.civilization);
        const availableCivs = civs.filter((civ) => !selectedCivs.includes(civ));
        if (!availableCivs.includes("Random")) {
            availableCivs.unshift("Random");
        }
        return availableCivs;
    }

    const availableSlots = (room && room.size) ? Array(room.size - (players.length)).fill(null) : [];

    return (
        <section className="players">
            <div className="player-game">
                {players.map((player) => (
                    <Player
                        key={player.id}
                        player={player}
                        onCivChange={handleChangeCivilization}
                        onColorChange={handleChangeColor}
                        onKick={() =>
                            handleKickMember(room.name, player.user.username, client, setNotifications)
                        }
                        showKickButton={isUserLeaderCookies(players) && !player.isLeader}
                        isStarted={room.isStarted}
                        availableColors={getAvailableColors()}
                        availableCivs={getAvailableCivs()}
                        isCurrentUserTurn={room.currentTurn === player.user.username}
                        hasRolledDice={player.hasRolledDice}
                    />
                ))}

                {!room.isStarted && availableSlots.map((_, index) => (
                    <div key={index} className="not-player no-select">Available Slot</div>
                ))}

                {!room.isStarted && (
                    <div className="btns-player">
                        <div className="flex-between">
                            <button
                                className="leave-btn btn-in no-select"
                                onClick={() => {
                                    handleLeaveRoom(room.name, client, setNotifications);
                                    navigate("/");
                                }}
                            >
                                leave
                            </button>
                            <button
                                className="btn-in no-select move-to-lobby-btn "
                                onClick={() => navigate("/")}
                            >
                                home
                            </button>
                        </div>

                        {isUserLeaderCookies(players) && (
                            <div className="flex-between">
                                <button
                                    onClick={() => {
                                        handleDeleteRoom(room.name, client, setNotifications);
                                        navigate("/");
                                    }}
                                    className="delete-room-btn btn-in no-select"
                                >
                                    delete
                                </button>
                                <button
                                    onClick={onStartGame}
                                    className="move-to-lobby-btn bc-light-green btn-in no-select"
                                >
                                    start
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
