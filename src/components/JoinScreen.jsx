// src/pages/JoinScreen.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinScreen = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // react-router-dom의 useNavigate 훅 사용

  const handleJoinClick = () => {
    if (username.trim().length === 0) return;
    // Join 클릭 후 Chat 화면으로 이동
    navigate("/chat", { state: { username } });
  };

  return (
    <div className="screen join-screen active">
      <div className="form">
        <h2>Join Chatroom</h2>
        <div className="form-input">
          <label>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <button id="join-user" onClick={handleJoinClick}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinScreen;
