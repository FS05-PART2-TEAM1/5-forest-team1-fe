import { io } from "socket.io-client";

// `.env`에서 백엔드 URL을 가져오되, 없으면 로컬 서버 사용
const SERVER_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : `${
      window.location.protocol === "https:" ? "wss://" : "ws://"
    }five-forest-team1.onrender.com:5432/api/`;
console.log("WebSocket 연결 시도 중:", SERVER_URL);
const socket = io(SERVER_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

socket.on("connect", () => {
  console.log(`✅ WebSocket 서버 연결 성공: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log("❌ WebSocket 서버 연결 해제");
});

export default socket;
