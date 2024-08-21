import "./styles.css";
import civkaLogoImg from "../../../../images/civka-logo.png";
import Message from "./Message";
import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {getAllMessages} from "../../../../utils/http";
import {handleInputChange, handleKeyDown} from "../../../../utils/chat";

export default function Chat({ roomName, client, isConnected, setNotifications }) {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const chatContainerRef = useRef();
    const messageInputRef = useRef();

    function onLobbyChatMessageReceived(message) {
        const parsedMessage = JSON.parse(message.body);
        const {id, sender, content, timestamp, receiver} = parsedMessage;
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
            return newMessages.length > 200 ? newMessages.slice(-200) : newMessages;
        });
    }


    useEffect(() => {
        if (client && isConnected) {
            const token = Cookies.get("token");
            getAllMessages(roomName, token)
                .then((messages) => {
                    setMessages(messages);
                    setIsInitialLoad(true);
                })
                .catch((error) =>
                    setError({message: error.message || "An error occurred"})
                );
            scrollToBottom();
            const publicMessagesSubscription = client.subscribe(
                "/topic/chat/" + roomName,
                onLobbyChatMessageReceived
            );
            return () => {
                publicMessagesSubscription.unsubscribe();
            };
        }
    }, [client, isConnected, roomName]);

    useEffect(() => {
        if (isInitialLoad) {
            scrollToBottom();
            setIsInitialLoad(false);
        }
    }, [messages, isInitialLoad]);

    useEffect(() => {
        if (isScrolledToBottom(chatContainerRef.current)) {
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
        try {
            client.publish({
                destination: "/app/chat/sendPublicMessage/" + roomName,
                headers: {
                    Authorization: `Bearer ${token}`,
                    username: username,
                },
                body: JSON.stringify({content: messageContent}),
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

    function isScrolledToBottom(chatContainer, tolerance = 80) {
        if (!chatContainer) return false;
        const {scrollHeight, scrollTop, clientHeight} = chatContainer;
        return Math.abs(scrollHeight - (scrollTop + clientHeight)) <= tolerance;
    }

    function scrollToBottom() {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
        }
    }

    return (
        <div className="board__element board__element-center border">
            <img src={civkaLogoImg} alt="civka logo" className="logo-center" />
            <div className="chat-monopoly">
                <div className="chat-zone-monopoly scroll" ref={chatContainerRef}>
                    {!error &&
                        messages.map((message, index) => (
                            <Message key={index} nickname={message.sender.nickname} timestamp={message.timestamp}>
                                {message.content}
                            </Message>
                        ))}
                    {error && <p>{error.message}</p>}
                </div>
                <div className="monopoly-flex-between">
                    <textarea
                        className="chat__typing-input monopoly-chat__typing-input scroll"
                        ref={messageInputRef}
                        onKeyDown={(event) => handleKeyDown(event, handleSendMessage)}
                        onChange={handleInputChange}
                        maxLength={250}
                    ></textarea>
                    <button className="chat__typing-btn monopoly-chat__typing-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="chat__typing-btn-svg board-chat__typing-btn-svg"
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
        </div>
    );
}