import "./styles.css";
import LobbyList from "../../components/lobby/LobbyList";
import Chat from "../../components/chat/public/Chat";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Client } from "@stomp/stompjs";
import { IP } from "../../constraints";

export default function Homepage({ setNotifications }) {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        const client = new Client({
            brokerURL: "ws://" + IP + ":8080/ws",
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log("Homepage connected");
                setIsConnected(true);
            },
            onStompError: () => {
                console.log("Failed to connect homepage client");
                setIsConnected(false);
            },
        });

        client.activate();
        setClient(client);

        return () => {
            client.deactivate();
            setClient(null);
            setIsConnected(false);
        };
    }, []);

    return (
        <main>
            <div className="gradiant-violet">
                <section className="section section__preview">
                    <h1 className="section__preview-h1">Civ Monopoly</h1>
                    <p className="section__preview-p">
                        Introducing "Civ monopoly" — a strategic turn-based game
                        that blends the best elements of Civilization VI with
                        the world of Monopoly! Imagine building your own
                        economic empire, acquiring properties and constructing
                        monopolies while also managing diplomacy and war. In
                        this high-stakes game, players must balance their
                        business ambitions with their military might, as rivals
                        can invade your territories and seize your assets.
                    </p>
                </section>
            </div>

            <div className="gradiant-violet-reverse">
                <section className="section section-grid">
                    <LobbyList
                        client={client}
                        isConnected={isConnected}
                        setNotifications={setNotifications}
                    />
                    <Chat
                        client={client}
                        isConnected={isConnected}
                        setNotifications={setNotifications}
                    />
                </section>
            </div>
        </main>
    );
}
