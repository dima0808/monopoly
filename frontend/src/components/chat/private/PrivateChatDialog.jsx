import React, {useEffect, useState} from "react";
import "../styles.css";
import {createPortal} from "react-dom";
import Contact from "./Contact";
import Chat from "./Chat";
import {getUser, getUserContacts} from "../../../utils/http";
import Cookies from "js-cookie";
import {Client} from "@stomp/stompjs";

export default function PrivateChatDialog({setNotifications, isOpen, onClose, selectedUser, setSelectedUser}) {
    const [error, setError] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    function onNewMessageReceived(message) {
        const parsedMessage = JSON.parse(message.body);
        setContacts((prevContacts) => {
            return prevContacts.map((contact) => {
                return contact.nickname === parsedMessage.nickname ? parsedMessage : contact;
            });
        });
    }

    useEffect(() => {
        if (isOpen) {
            const token = Cookies.get('token');
            const username = Cookies.get('username');
            const client = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                    Authorization: `Bearer ${token}`
                },
                onConnect: () => {
                    console.log('Private chat connected');
                    client.subscribe('/user/' + username + '/chat/contacts', onNewMessageReceived);
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
                  onClose={() => {
                      onClose();
                      setSelectedUser(null);
                  }}/>
        </dialog>,
        document.getElementById("modal")
    );
}