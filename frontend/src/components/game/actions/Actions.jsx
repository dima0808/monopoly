import { useCallback, useEffect } from "react";
import './styles.css';
import Cookies from "js-cookie";

export default function Actions({ room, players, client, setNotifications }) {

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

    const isCurrentUserTurn = room.isStarted && room.currentTurn === Cookies.get("username");
    const currentUser = players.find((player) => player.user.username === Cookies.get("username"));
    const hasRolledDice = currentUser && currentUser.rolledDice;

    useEffect(() => {
        if (isCurrentUserTurn && !hasRolledDice) {
            const timer = setTimeout(() => {
                handleRollDice();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isCurrentUserTurn, hasRolledDice, handleRollDice]);

    return (
        <section className="actions">
            {isCurrentUserTurn && !hasRolledDice && <button onClick={handleRollDice}>roll</button>}
            {isCurrentUserTurn && hasRolledDice && <button onClick={handleEndTurn}>end turn</button>}
        </section>
    );
}
