// src/pages/ChatScreen.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("https://five-forest-team1.onrender.com"); // 서버 URL로 수정

const ChatScreen = () => {
  const { state } = useLocation(); // state에서 username 받기
  const { username } = state;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("newuser", username);

    socket.on("chat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit("exituser", username); // 채팅 종료 시 사용자 퇴장 알리기
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    socket.emit("chat", { username, message });
    setMessages([...messages, { username, message }]);
    setMessage("");
  };

  return (
    <div className="screen chat-screen active">
      <div className="header">
        <div className="logo">Chatroom</div>
        <button
          id="exit-chat"
          onClick={() => socket.emit("exituser", username)}
        >
          Exit
        </button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.username === username ? "my-message" : "other-message"
            }`}
          >
            <div>
              <div className="name">{msg.username}</div>
              <div className="text">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="typebox">
        <input
          type="text"
          id="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button id="send-message" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
