import React, { useCallback, useEffect } from "react";
import Player from "./Player";
import "./styles.css";
import Cookies from "js-cookie";
import ancientEraImg from "../../../images/back-ancient-era.jpg";
import classicalEraImg from "../../../images/back-classical-era.png";
import medievalEraImg from "../../../images/back-medieval-era.png";
import renaissanceEraImg from "../../../images/back-renaissance-era.png";
import industrialEraImg from "../../../images/back-industrial-era.png";
import modernEraImg from "../../../images/back-modern-era.png";
import atomicEraImg from "../../../images/back-atomic-era.png";
import informationEraImg from "../../../images/back-information-era.png";

import { useNavigate } from "react-router-dom";
import {
    handleDeleteRoom,
    handleKickMember,
    handleLeaveRoom,
    isUserLeaderCookies,
} from "../../../utils/lobby";

const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "turquoise",
    "orange",
    "pink",
    "violet",
];
const civs = [
    "Random",
    "Colombia",
    "Egypt",
    "Germany",
    "Japan",
    "Korea",
    "Rome",
    "Sweden",
];

export default function PlayerList({
    room,
    onStartGame,
    players,
    setPlayers,
    client,
    isConnected,
    setNotifications,
}) {
    const navigate = useNavigate();

    const onPlayerMessageReceived = useCallback(
        (message) => {
            const { type, content, room, member } = JSON.parse(message.body);
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
        },
        [setPlayers]
    );

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
    }, [client, isConnected, onPlayerMessageReceived, room]);

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
                "Changing civilization for " +
                    username +
                    " to " +
                    civilization +
                    "..."
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
            console.log(
                "Changing color for " + username + " to " + color + "..."
            );
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

    const availableSlots =
        room && room.size ? Array(room.size - players.length).fill(null) : [];

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
                            handleKickMember(
                                room.name,
                                player.user.username,
                                client,
                                setNotifications
                            )
                        }
                        showKickButton={
                            !room.isStarted &&
                            isUserLeaderCookies(players) &&
                            !player.isLeader
                        }
                        isStarted={room.isStarted}
                        availableColors={getAvailableColors()}
                        availableCivs={getAvailableCivs()}
                        isCurrentUserTurn={
                            room.currentTurn === player.user.username
                        }
                        hasRolledDice={player.hasRolledDice}
                    />
                ))}

                {!room.isStarted &&
                    availableSlots.map((_, index) => (
                        <div key={index} className="not-player no-select">
                            Available Slot
                        </div>
                    ))}

                {!room.isStarted && (
                    <div className="btns-player">
                        <div className="flex-between">
                            <button
                                className="leave-btn btn-in no-select"
                                onClick={() => {
                                    handleLeaveRoom(
                                        room.name,
                                        client,
                                        setNotifications
                                    );
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
                                        handleDeleteRoom(
                                            room.name,
                                            client,
                                            setNotifications
                                        );
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
                <div className="turn-and-era">
                    {/* ancient */}
                    <div className="turn">
                        <img
                            src={ancientEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Ancient era:0-10</p>
                        </div>
                    </div>
                    {/* classical */}
                    <div className="turn">
                        <img
                            src={classicalEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Classical era:10-20</p>
                        </div>
                    </div>
                    {/* medieval */}
                    <div className="turn">
                        <img
                            src={medievalEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Medieval era:20-30</p>
                        </div>
                    </div>
                    {/* renaissance */}
                    <div className="turn">
                        <img
                            src={renaissanceEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Renaissance era:30-40</p>
                        </div>
                    </div>
                    {/* industrial */}
                    <div className="turn">
                        <img
                            src={industrialEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Industrial era:40-50</p>
                        </div>
                    </div>
                    {/* modern */}
                    <div className="turn">
                        <img
                            src={modernEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Modern era:40-50</p>
                        </div>
                    </div>
                    {/* atomic */}
                    <div className="turn">
                        <img
                            src={atomicEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Atomic era:40-50</p>
                        </div>
                    </div>
                    {/* information */}
                    <div className="turn">
                        <img
                            src={informationEraImg}
                            className="age-img"
                            alt="stones"
                        />
                        <div className="turn-div epoch-div">
                            <p>Information era:40-50</p>
                        </div>
                    </div>
                    <div className="torn-counter">43</div>
                </div>
            </div>
        </section>
    );
}
