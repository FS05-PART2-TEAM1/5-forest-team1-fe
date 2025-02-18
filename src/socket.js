import { io } from "socket.io-client";

const SERVER_URL = "https://sprint-forest-be.onrender.com";

// import.meta.env.VITE_API_BASE_URL
//   ? import.meta.env.VITE_API_BASE_URL
//   : `${
//       window.location.protocol === "https:" ? "wss://" : "ws://"
//     }five-forest-team1.onrender.com:5432/api/`;
console.log("WebSocket 연결 시도 중:", SERVER_URL);

// const testSocket = new WebSocket("http://localhost:5432");

// testSocket.onopen = () => console.log("✅ WebSocket 연결 성공!");
// testSocket.onerror = (error) => console.log("❌ WebSocket 연결 실패!", error);
// testSocket.onclose = () => console.log("❌ WebSocket 연결 닫힘!");
// const socket = io(SERVER_URL, {
//   transports: ["websocket"],
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 3000,
// });
const socket = io.connect(SERVER_URL);

socket.on("connect", () => {
  console.log(`✅ WebSocket 서버 연결 성공: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log("❌ WebSocket 서버 연결 해제");
});

setTimeout(() => {
  socket.emit("lalala", { message: "hihihihihi" });
}, 500);

export default socket;
