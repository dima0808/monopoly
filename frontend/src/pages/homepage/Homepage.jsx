import "./styles.css";
import LobbyList from "../../components/lobby/LobbyList";
import Chat from "../../components/chat/Chat";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";

export default function Homepage({setNotifications}) {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log('Homepage connected');
                setIsConnected(true);
            },
            onStompError: () => {
                console.log('Failed to connect');
                setIsConnected(false);
            },
        });

        client.activate();
        setClient(client);

        return () => {
            client.deactivate();
        };
    }, []);

    return (
        <main>
            <div className="gradiant-violet">
                <section className="section section__preview">
                    <h1 className="section__preview-h1">Civ Monopoly</h1>
                    <p className="section__preview-p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
                        quis placeat, aspernatur itaque nisi quasi nulla iste quae, quas
                        maxime mollitia laborum a? Suscipit, nobis? Asperiores dolor soluta
                        eligendi molestiae. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Temporibus, natus harum! Dolores culpa iusto
                        commodi
                    </p>
                </section>
            </div>

            <div className="gradiant-violet-reverse">
                <section className="section section-grid">
                    <LobbyList client={client} isConnected={isConnected} setNotifications={setNotifications}/>
                    <Chat client={client} isConnected={isConnected} setNotifications={setNotifications}/>
                </section>
            </div>
        </main>
    );
}