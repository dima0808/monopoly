import React, {useState, useEffect} from "react";
import "../styles.css";
import {createPortal} from "react-dom";
import Contact from "./Contact";
import Chat from "./Chat";
import {getUser, getUserContacts} from "../../../utils/http";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";

export default function PrivateChatDialog({notifications, setNotifications, isOpen, onClose}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const token = Cookies.get('token');
            const client = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                    Authorization: `Bearer ${token}`
                },
                onConnect: () => {
                    console.log('Private chat connected');
                    setIsConnected(true);
                },
                onStompError: () => {
                    console.log('Failed to connect private chat client');
                    setIsConnected(false);
                },
            });

            client.activate();
            setClient(client);

            return () => {
                client.deactivate();
                setClient(null);
                setIsConnected(false);
                console.log('Private chat disconnected');
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const username = Cookies.get("username");
        const token = Cookies.get("token");
        getUserContacts(username, token).then(setContacts)
            .catch((error) => setError({message: error.message || "An error occurred"}));
    }, []);

    function handleContactClick(nickname) {
        getUser(nickname).then(setSelectedUser);
    }

    if (!isOpen) return null;

    return createPortal(
        <dialog open className="chat-dialog">
            <div className="user-contacts">
                <div className="search-user-contacts-div">
                    <input
                        type="text"
                        className="search-user-contacts search-user-contacts-input"
                        placeholder="Find User"
                    ></input>
                </div>
                <div className="your-contacts scroll">
                    {!error && contacts.map((contact) => (
                        <Contact key={contact.nickname}
                                 nickname={contact.nickname}
                                 lastMessage={contact.lastMessage.content}
                                 onClick={() => handleContactClick(contact.nickname)}
                                 isSelected={contact.nickname === selectedUser?.nickname}/>
                    ))}
                    {error && <p className="error-message">{error.message}</p>}
                </div>
            </div>
            <Chat selectedUser={selectedUser}
                  client={client}
                  isConnected={isConnected}
                  setNotifications={setNotifications}
                  onClose={onClose}/>
        </dialog>,
        document.getElementById("modal")
    );
}