import "../styles.css";
import Message from "./Message";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {getAllMessages} from "../../../utils/http";

export default function Chat({selectedUser, client, isConnected, setNotifications, onClose}) {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const messageInputRef = useRef();
    const chatContainerRef = useRef();

    function onChatMessageReceived(message) {
        const parsedMessage = JSON.parse(message.body);
        const { id, sender, content, timestamp, receiver } = parsedMessage;
        setMessages((prevMessages) => {
            const newMessages = [
                ...prevMessages,
                {
                    id: id,
                    sender: sender,
                    content: content,
                    timestamp: timestamp,
                    receiver: receiver,
                },
            ];
            return newMessages.length > 80 ? newMessages.slice(-80) : newMessages;
        });
    }

    useEffect(() => {
        if (selectedUser && client && isConnected) {
            const chatName = [Cookies.get("username"), selectedUser.username].sort().join(" ");
            const username = Cookies.get("username");
            const token = Cookies.get("token");
            getAllMessages(chatName, token, true).then(setMessages)
                .catch((error) => setError({message: error.message || "An error occurred"}));
            const privateMessagesSubscription = client.subscribe(
                "/user/" + username + "/chat/private/" + selectedUser.username, onChatMessageReceived);
            return () => {
                privateMessagesSubscription.unsubscribe();
            };
        }
    }, [selectedUser, client, isConnected]);

    useEffect(() => {
        if (isScrolledToBottom()) {
            scrollToBottom();
        }
    }, [messages]);

    function handleSendMessage() {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        const messageContent = messageInputRef.current.value.trim();
        if (!messageContent) {
            messageInputRef.current.value = "";
            return;
        }
        if (messageContent.length > 250) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Message exceeds 300 characters",
                    duration: 3500,
                    isError: true,
                },
            ]);
            return;
        }
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
        const chatName = [username, selectedUser.username].sort().join(" ");
        try {
            client.publish({
                destination: "/app/chat/sendPrivateMessage/" + chatName,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
                body: JSON.stringify({ content: messageContent }),
            });

            console.log("Sending message: " + messageContent);
            messageInputRef.current.value = "";
            scrollToBottom();
        } catch (error) {
            setNotifications((prev) => [
                ...prev,
                {
                    message: "Error sending message (no connection)",
                    duration: 3500,
                    isError: true,
                },
            ]);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    function isScrolledToBottom() {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        return (
            scrollHeight - scrollTop < clientHeight + 80 &&
            scrollHeight - scrollTop > clientHeight - 80
        );
    }

    function scrollToBottom() {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    return (
        <div className="choosen-user">
            <div className="user-and-close">
                {selectedUser && <Link to={"/profile/" + selectedUser.nickname}
                                       className="user-and-close-a">{selectedUser.nickname}</Link>}
                {!selectedUser && <p className="user-and-close-a"></p>}
                <button type="button" className="dialog-close" onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="kick-svg2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="chat-zone scroll" ref={chatContainerRef}>
                {!error && messages.map((message, index) => (
                    <Message key={index} isYourMessage={Cookies.get("username") === message.sender.username}>
                        {message.content}
                    </Message>
                ))}
                {error && <p>{error.message}</p>}
            </div>
            <div className="chat__typing chat__typing-dialog">
                <textarea
                    ref={messageInputRef}
                    className="chat__typing-input chat__typing-input-dialog scroll"
                    maxLength={250}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <button className="chat__typing-btn" onClick={handleSendMessage}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="chat__typing-btn-svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}