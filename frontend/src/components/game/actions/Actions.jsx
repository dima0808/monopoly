import './styles.css';
import Cookies from "js-cookie";

export default function Actions({ room, client, setNotifications }) {

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

    return (
        <section className="actions">
            {(room.isStarted && room.currentTurn === Cookies.get("username")) && <button onClick={handleRollDice}>roll</button>}
        </section>
    );
}
