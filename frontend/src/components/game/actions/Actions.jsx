import React, { useEffect, useState } from 'react';
import './styles.css';
import Cookies from "js-cookie";

export default function Actions({ room, dice, client, setNotifications }) {
    const [diceTimestamp, setDiceTimestamp] = useState(null);

    const handleRollDice = () => {
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
    };

    useEffect(() => {
        if (dice.firstRoll !== null && dice.secondRoll !== null) {
            setDiceTimestamp(Date.now());
        }
    }, [dice]);

    useEffect(() => {
        if (diceTimestamp) {
            const timer = setTimeout(() => {
                setDiceTimestamp(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [diceTimestamp]);

    return (
        <section className="actions">
            {room.isStarted && <button onClick={handleRollDice}>roll</button>}
            {diceTimestamp && (
                <div>
                    Dice: {dice.firstRoll} {dice.secondRoll}
                </div>
            )}
        </section>
    );
}
