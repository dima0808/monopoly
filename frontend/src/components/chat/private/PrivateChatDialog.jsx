import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import { createPortal } from "react-dom";
import Contact from "./Contact";
import Chat from "./Chat";
import {
    getUser,
    getUserContacts,
    getAllSuggestedContacts,
} from "../../../utils/http";
import Cookies from "js-cookie";
import { Client } from "@stomp/stompjs";
import {IP} from "../../../constraints";

export default function PrivateChatDialog({
    setNotifications,
    isOpen,
    onClose,
    selectedUser,
    setSelectedUser,
}) {
    const [error, setError] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchTimeoutRef = useRef(null);

    function onNewMessageReceived(message) {
        const parsedMessage = JSON.parse(message.body);
        setContacts((prevContacts) => {
            const contactExists = prevContacts.some(
                (contact) => contact.nickname === parsedMessage.nickname
            );
            if (contactExists) {
                return prevContacts.map((contact) =>
                    contact.nickname === parsedMessage.nickname
                        ? parsedMessage
                        : contact
                );
            } else {
                return [...prevContacts, parsedMessage];
            }
        });
    }

    useEffect(() => {
        if (isOpen) {
            const token = Cookies.get("token");
            const username = Cookies.get("username");
            const client = new Client({
                brokerURL: 'ws://' + IP + ':8080/ws',
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                onConnect: () => {
                    console.log("Private chat connected");
                    client.subscribe(
                        "/user/" + username + "/chat/contacts",
                        onNewMessageReceived
                    );
                    setIsConnected(true);
                },
                onStompError: () => {
                    console.log("Failed to connect private chat client");
                    setIsConnected(false);
                },
            });

            client.activate();
            setClient(client);

            getUserContacts(username, token)
                .then(setContacts)
                .catch((error) =>
                    setError({ message: error.message || "An error occurred" })
                );

            return () => {
                client.deactivate();
                setClient(null);
                setIsConnected(false);
                console.log("Private chat disconnected");
            };
        }
    }, [isOpen]);

    function handleContactClick(nickname) {
        getUser(nickname)
            .then(setSelectedUser)
            .catch((error) => {
                if (error.status === 404) {
                    setContacts((prevContacts) =>
                        prevContacts.filter(
                            (contact) => contact.nickname !== nickname
                        )
                    );
                }
            });
    }

    function performSearch(searchTerm) {
        const token = Cookies.get("token");
        const username = Cookies.get("username");

        if (searchTerm.trim() === "") {
            getUserContacts(username, token)
                .then(setContacts)
                .catch((error) =>
                    setError({ message: error.message || "An error occurred" })
                );
        } else {
            getAllSuggestedContacts(username, token, searchTerm.trim())
                .then(setContacts)
                .catch((error) =>
                    setError({ message: error.message || "An error occurred" })
                );
        }
    }

    function handleSearchChange(event) {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchTerm.trim() === "") {
            performSearch(searchTerm);
        } else {
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(searchTerm);
            }, 600);
        }
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
                        value={searchTerm}
                        onChange={handleSearchChange}
                    ></input>
                </div>
                <div className="your-contacts scrollable-div">
                    {!error &&
                        contacts
                            .sort((a, b) => {
                                const aTimestamp = a.lastMessage
                                    ? Date.parse(a.lastMessage.timestamp)
                                    : 0;
                                const bTimestamp = b.lastMessage
                                    ? Date.parse(b.lastMessage.timestamp)
                                    : 0;
                                return bTimestamp - aTimestamp;
                            })
                            .map((contact) => (
                                <Contact
                                    key={contact.nickname}
                                    nickname={contact.nickname}
                                    lastMessage={contact.lastMessage}
                                    onClick={() =>
                                        handleContactClick(contact.nickname)
                                    }
                                    isSelected={
                                        contact.nickname ===
                                        selectedUser?.nickname
                                    }
                                    unreadMessages={contact.unreadMessages}
                                />
                            ))}
                    {error && <p className="error-message">{error.message}</p>}
                </div>
            </div>
            <Chat
                selectedUser={selectedUser}
                selectedContact={contacts.find(
                    (contact) => contact.nickname === selectedUser?.nickname
                )}
                client={client}
                isConnected={isConnected}
                setNotifications={setNotifications}
                onClose={() => {
                    onClose();
                    setSelectedUser(null);
                }}
            />
        </dialog>,
        document.getElementById("modal")
    );
}
