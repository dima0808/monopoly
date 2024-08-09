import "./styles.css";
import LobbyList from "../../components/lobby/LobbyList";
import Chat from "../../components/chat/Chat";
import Message from "../../components/chat/Message";
import Notification from '../../components/notification/Notification';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Client } from "@stomp/stompjs";

export default function Homepage() {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);

    function onNotificationReceived(message) {
        const notification = JSON.parse(message.body);
        console.log(notification);
        setNotifications(prev => [...prev, { message : notification.message, duration: 5000, isError: false }]);
    }

    function onErrorReceived(message) {
        const error = JSON.parse(message.body);
        console.log(error);
        setNotifications(prev => [...prev, { message : error.message, duration: 5000, isError: true }]);
    }

    function removeNotification(timeStamp) {
        setNotifications(prev => prev.filter(notification => notification.timeStamp !== timeStamp));
    }

    useEffect(() => {
        const token = Cookies.get('token');
        const username = Cookies.get('username');
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: () => {
                console.log('Connected!!!!!!!!!!');
                client.subscribe('/user/' + username + '/queue/notifications', onNotificationReceived);
                client.subscribe('/user/' + username + '/queue/errors', onErrorReceived);
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
                    <LobbyList client={client} isConnected={isConnected}/>
                    <Chat>
                        <Message username="Dimitri">Hello guys!</Message>
                        <Message username="Nazar">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">HiHiHiHiH iHiHiHiHiH iHiHiHiHiH iHiHiHiHiH
                            iHiHiHiHiH iHiHiHiHiH iHiHiHiHiH iHiHiHiHiHiHiHiHiHiHiHi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                        <Message username="Alexei">Hi!</Message>
                    </Chat>
                </section>
            </div>
            <div className="notification-stack">
                {notifications.map((notification, index) => (
                    <Notification
                        key={index}
                        message={notification.message}
                        duration={notification.duration}
                        isError={notification.isError}
                        style={{ top: `${85 + index * 80}px`, right: '20px' }}
                        onClose={() => removeNotification(notification.timeStamp)}
                    />
                ))}
            </div>
        </main>
    );
}