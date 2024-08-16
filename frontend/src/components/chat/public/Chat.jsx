import "../styles.css";
import React, { useEffect, useRef, useState } from "react";
import { getAllMessages } from "../../../utils/http";
import Message from "./Message";
import Cookies from "js-cookie";

export default function Chat({ client, isConnected, setNotifications }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const messageInputRef = useRef();
  const chatContainerRef = useRef();

  function onChatMessageReceived(message) {
    const parsedMessage = JSON.parse(message.body);
    if (parsedMessage.type) {
      switch (parsedMessage.type) {
        case "CLEAR":
          if (parsedMessage.content.split(" ")[0] === "All") {
            setMessages([]);
          } else {
            const clearCount = parseInt(
              parsedMessage.content.split(" ")[0],
              10
            );
            setMessages((prevMessages) => prevMessages.slice(0, -clearCount));
          }
          return;
        case "DELETE":
          return;
        default:
          return;
      }
    }
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
    if (client && isConnected) {
      const token = Cookies.get("token");
      getAllMessages("public", token)
        .then(setMessages)
        .catch((error) =>
          setError({ message: error.message || "An error occurred" })
        );
      scrollToBottom();
      const username = Cookies.get("username");
      const publicMessagesSubscription = client.subscribe(
        "/topic/chat/public",
        onChatMessageReceived
      );
      const privateMessagesSubscription = client.subscribe(
        "/user/" + username + "/topic/chat/public",
        onChatMessageReceived
      );
      return () => {
        publicMessagesSubscription.unsubscribe();
        privateMessagesSubscription.unsubscribe();
      };
    }
  }, [client, isConnected]);

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
    const [command, param] = messageContent.split(" ").filter(Boolean);
    try {
      switch (command) {
        case "/clear":
          if (param) {
            const clearCount = parseInt(param, 10);
            client.publish({
              destination: "/app/chat/clear/public",
              headers: {
                Authorization: `Bearer ${token}`,
                username: username,
                clearCount: clearCount,
              },
            });
          } else {
            client.publish({
              destination: "/app/chat/clear/public",
              headers: {
                Authorization: `Bearer ${token}`,
                username: username,
                clearCount: "All",
              },
            });
          }
          break;
        default:
          client.publish({
            destination: "/app/chat/sendPublicMessage/public",
            headers: {
              Authorization: `Bearer ${token}`,
              username: username,
            },
            body: JSON.stringify({ content: messageContent }),
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

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  }

  function handleInputChange(event) {
    if (event.target.value.length > 250) {
      event.target.value = event.target.value.slice(0, 250);
    }
  }

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
    <section className="chat">
      <div className="chat__title title-box">Public Chat</div>
      <div className="chat__text scroll" id="chat" ref={chatContainerRef}>
        {!error &&
          messages.map((message, index) => (
            <Message key={index} nickname={message.sender.nickname}>
              {message.content}
            </Message>
          ))}
        {error && <p>{error.message}</p>}
      </div>

      <div className="chat__typing">
        <textarea
          className="chat__typing-input scroll"
          ref={messageInputRef}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          maxLength={250}
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
    </section>
  );
}
