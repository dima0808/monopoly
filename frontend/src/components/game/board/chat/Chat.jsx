import "./styles.css";
import civkaLogoImg from "../../../../images/civka-logo.png";
import Message from "./Message";
import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {getAllMessages} from "../../../../utils/http";
import {handleInputChange, handleKeyDown} from "../../../../utils/chat";
import SystemMessage from "./SystemMessage";
import goldImg from "../../../../images/icon-gold.png";
import tourismImg from "../../../../images/icon-tourism.png";
import {propertiesInfo} from "../../../../constraints";

export default function Chat({roomName, client, isConnected, setNotifications, setSelectedUser, setIsPrivateChatOpen}) {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const chatContainerRef = useRef();
    const messageInputRef = useRef();

    function onLobbyChatMessageReceived(message) {
        const parsedMessage = JSON.parse(message.body);
        const {id, type, sender, content, timestamp, receiver} = parsedMessage;
        setMessages((prevMessages) => {
            const newMessages = [
                ...prevMessages,
                {
                    id: id,
                    type: type,
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
        if (roomName && client && isConnected) {
            const token = Cookies.get("token");
            getAllMessages(roomName, token)
                .then((messages) => {
                    setMessages(messages);
                    setIsInitialLoad(true);
                    setError(false);
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
        const [command, param, targetUser] = messageContent.split(" ").filter(Boolean);
        try {
            switch (command) {
                case "/addGold":
                    if (param && targetUser) {
                        const gold = parseInt(param, 10);
                        client.publish({
                            destination: "/app/rooms/" + roomName + "/addGold/" + targetUser,
                            headers: {
                                Authorization: `Bearer ${token}`,
                                username: username,
                                gold: gold,
                            },
                        });
                    }
                    break;
                case "/addStrength":
                    if (param && targetUser) {
                        const strength = parseInt(param, 10);
                        client.publish({
                            destination: "/app/rooms/" + roomName + "/addStrength/" + targetUser,
                            headers: {
                                Authorization: `Bearer ${token}`,
                                username: username,
                                strength: strength,
                            },
                        });
                    }
                    break;
                case "/addEvent":
                    if (param && targetUser) {
                        const event = parseInt(param, 10);
                        client.publish({
                            destination: "/app/rooms/" + roomName + "/addEvent/" + targetUser,
                            headers: {
                                Authorization: `Bearer ${token}`,
                                username: username,
                                event: event,
                            },
                        });
                    }
                    break;
                case "/move":
                    if (param && targetUser) {
                        const position = parseInt(param, 10);
                        client.publish({
                            destination: "/app/rooms/" + roomName + "/goToPosition/" + targetUser,
                            headers: {
                                Authorization: `Bearer ${token}`,
                                username: username,
                                position: position,
                            },
                        });
                    }
                    break;
                default:
                    client.publish({
                        destination: "/app/chat/sendPublicMessage/" + roomName,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            username: username,
                        },
                        body: JSON.stringify({content: messageContent}),
                    });
            }
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
            <img src={civkaLogoImg} alt="civka logo" className="logo-center"/>
            <div className="chat-monopoly">
                <div className="chat-zone-monopoly scroll" ref={chatContainerRef}>
                    {!error &&
                        messages.map((message, index) => {
                            if (message.type) {
                                const data = message.content.split(" ");
                                switch (message.type) {
                                    case 'SYSTEM_ROLL_DICE':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                кинув кубики <span className="system-tile-span">{data[1]}</span>
                                                та <span className="system-tile-span">{data[2]}</span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_BERMUDA':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                телепортувався на
                                                <span className="system-tile-span"> {propertiesInfo[data[1]] ?
                                                    propertiesInfo[data[1]]['LEVEL_1'].name : 'Адмін даун'}
                                                </span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_SCIENCE_PROJECT':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                виконав проєкт
                                                <span className="system-tile-span"> {data[1]}</span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_CONCERT':
                                        return (
                                            <SystemMessage key={index}
                                                           timestamp={message.timestamp}>
                                                гравець <span
                                                className="system-span">{data[0]}</span>
                                                провів концерт і отримав
                                                <div className="inline-block">
                                                    <div
                                                        className="player-stat-tourism width-full pointer no-select">
                                                        <img
                                                            src={tourismImg}
                                                            className="recourse-img"
                                                            alt="tourism"
                                                        />
                                                        {data[1]}
                                                    </div>
                                                </div>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_BIG_BEN':
                                        return (
                                            <SystemMessage key={index}
                                                           timestamp={message.timestamp}>
                                                гравець <span
                                                className="system-span">{data[0]}</span>
                                                обшарпав кожного на
                                                <div className="inline-block">
                                                    <div
                                                        className="player-stat-gold width-full pointer no-select">
                                                        <img
                                                            src={goldImg}
                                                            className="recourse-img"
                                                            alt="gold"
                                                        />
                                                        {data[1]}
                                                    </div>
                                                </div>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_PAY_RENT':
                                        return (
                                            <SystemMessage key={index}
                                                           timestamp={message.timestamp}>
                                                гравець <span
                                                className="system-span">{data[0]}</span>
                                                заплатив
                                                <div className="inline-block">
                                                    <div
                                                        className="player-stat-gold width-full pointer no-select">
                                                        <img
                                                            src={goldImg}
                                                            className="recourse-img"
                                                            alt="gold"
                                                        />
                                                        {data[1]}
                                                    </div>
                                                </div>
                                                гравцю <span className="system-span">{data[2]}</span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_BUY_PROPERTY':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                купив
                                                <span className="system-tile-span"> {propertiesInfo[data[1]]['LEVEL_1'].name}
                                                </span>за
                                                <div className="inline-block">
                                                    <div className="player-stat-gold width-full no-select">
                                                        <img
                                                            src={goldImg}
                                                            className="recourse-img"
                                                            alt="gold"
                                                        />
                                                        {data[2]}
                                                    </div>
                                                </div>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_UPGRADE_PROPERTY':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                вдосконалив
                                                <span className="system-span"> {propertiesInfo[data[1]]['LEVEL_1'].name}
                                                </span>за
                                                <div className="inline-block">
                                                    <div className="player-stat-gold width-full no-select">
                                                        <img
                                                            src={goldImg}
                                                            className="recourse-img"
                                                            alt="gold"
                                                        />
                                                        {data[2]}
                                                    </div>
                                                </div>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_BYPASS_START':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                проходить коло та отримує
                                                <div className="inline-block">
                                                    <div className="player-stat-gold width-full no-select">
                                                        <img
                                                            src={goldImg}
                                                            className="recourse-img"
                                                            alt="gold"
                                                        />
                                                        {data[1]}
                                                    </div>
                                                </div>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_MORTGAGE_PROPERTY':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                заклав під заставу
                                                <span className="system-span"> {propertiesInfo[data[1]]['LEVEL_1'].name}
                                                </span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_REDEMPTION_PROPERTY':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                вертає з-під застави
                                                <span className="system-span"> {propertiesInfo[data[1]]['LEVEL_1'].name}
                                                </span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_DOWNGRADE_PROPERTY':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span>
                                                продає поліпшення для
                                                <span className="system-span"> {propertiesInfo[data[1]]['LEVEL_1'].name}
                                                </span>
                                            </SystemMessage>
                                        );
                                    case 'SYSTEM_WINNER':
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                гравець <span className="system-span">{data[0]}</span> виграв
                                            </SystemMessage>
                                        );
                                    default:
                                        return (
                                            <SystemMessage key={index} timestamp={message.timestamp}>
                                                {message.content}
                                            </SystemMessage>
                                        );
                                }
                            } else {
                                return (
                                    <Message key={index} nickname={message.sender.nickname}
                                             timestamp={message.timestamp}
                                             setSelectedUser={() => {
                                                 if (Cookies.get("nickname") === message.sender.nickname) {
                                                     setSelectedUser(null);
                                                     setIsPrivateChatOpen(true);
                                                 } else {
                                                     setSelectedUser(message.sender);
                                                     setIsPrivateChatOpen(true);
                                                 }
                                             }}>
                                        {message.content}
                                    </Message>
                                );
                            }
                        })
                    }
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