import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import exitIcn from "../assets/icons/exit.png";

export function ChatApp({ toggleChat }) {
  const [isChatting, setIsChatting] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  // const SERVER_URL = "https://five-forest-team1.onrender.com";
  const SERVER_URL = "http://localhost:8000";
  console.log("WebSocket 연결 시도 중:", SERVER_URL);

  useEffect(() => {
    if (isChatting) {
      console.log("✅ 채팅 시작: 소켓 연결 중...");
      // //const socketIo = io("https://five-forest-team1.onrender.com/");
      // const socketIo = io("http://localhost:8000");

      const socketIo = io.connect(SERVER_URL);
      setSocket(socketIo);
      socketIo.on("connect", () => {
        console.log("✅ 소켓 연결됨:", socketIo.connected);
        console.log(`✅ WebSocket 서버 연결 성공: ${socketIo.id}`);
        socketIo.emit("newuser", username);
      });

      socketIo.on("chat", (message) => {
        console.log("📩 메시지 수신:", message);

        // 메시지 데이터를 확인
        const messageData = {
          sender: message.sender,
          text: message.text,
          type: "other",
        };

        console.log("메시지:", messageData);

        setMessages((prevMessages) => [...prevMessages, messageData]);
      });

      socketIo.on("update", (updateMessage) => {
        console.log("🔔 업데이트 메시지:", updateMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "System", text: updateMessage, type: "update" },
        ]);
      });

      return () => {
        console.log("🚪 채팅 종료: 소켓 연결 해제");
        socketIo.disconnect();
      };
    }
  }, [isChatting]);

  const handleJoin = () => {
    if (username.trim()) {
      console.log(`✅ 유저 이름 입력됨: ${username}`);
      setIsChatting(true);
    } else {
      console.warn("⚠️ 유저 이름이 비어 있음!");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { sender: username, text: newMessage, type: "my" };
      console.log("📤 메시지 전송:", messageData);

      setMessages((prev) => [...prev, messageData]);
      setTimeout(() => {
        socket.emit("chat", messageData);
      }, 500);
      setNewMessage("");
    } else {
      console.warn("⚠️ 메시지가 비어 있음!");
    }
  };

  const handleExitChat = () => {
    console.log("🚪 채팅방 나가기:", username);
    socket.emit("exituser", username);
    setIsChatting(false);
    setMessages([]);
    setUsername("");
  };

  return (
    <div className="max-w-84 fixed bottom-4 right-4 bg-white border-gray-300 border-2 h-96 rounded-3xl shadow-xl z-50 transition-all duration-500 transform origin-bottom-right">
      {!isChatting ? (
        <div className="h-full flex justify-center items-center">
          <div className="form w-4/5 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b-4 border-gray-600 inline-block">
              채팅방 입장하기
            </h2>
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-2">
                닉네임 입력
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-400 text-lg rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              onClick={handleJoin}
              className="w-full py-2 bg-f-brand text-white text-lg rounded-lg hover:bg-f-green-text"
            >
              Join
            </button>
            <div className="absolute bottom-3 right-3 text-stone-400">
              <div
                onClick={toggleChat}
                className="px-2 py-2  bg-white border rounded-xl hover:bg-gray-300 cursor-pointer "
              >
                <img src={exitIcn} className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full  ">
          <div className="bg-gray-900 h-12 flex justify-between items-center pl-3 pr-1 text-white">
            <div className="text-lg font-semibold">실시간 채팅방</div>
            <button
              onClick={handleExitChat}
              className="px-2 py-2 bg-white border rounded-xl hover:bg-gray-300"
            >
              <img src={exitIcn} className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 bg-gray-100 overflow-auto p-3 ">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex my-2 ${
                  msg.type === "my" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "update" ? (
                  <div className="flex justify-center items-center font-thin text-center italic">
                    {msg.text}
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] p-3 shadow-md rounded-lg ${
                      msg.type === "my" ? "bg-lime-200" : "bg-white"
                    }`}
                  >
                    <div className="text-xs text-gray-600">
                      {msg.type === "my" ? "You" : msg.sender}
                    </div>
                    <div className="text-md">{msg.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-0-full flex border-t h-[50px] items-center bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(); // 엔터키 눌렀을 때 메시지 전송
                }
              }}
              className="w-full px-3 text-lg border-none outline-none"
              placeholder="메시지를 입력하세요..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 px-4 py-2 bg-gray-900 text-white text-lg rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
