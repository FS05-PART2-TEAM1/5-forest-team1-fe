import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import exitIcn from "../assets/icons/exit.png";
import logoImg from "../assets/img_logo.png";
export function ChatApp({ toggleChat }) {
  const [isChatting, setIsChatting] = useState(false);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  // const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
  const SERVER_URL = "https://sprint-forest-be.onrender.com";
  // const SERVER_URL = "http://localhost:8000";
  console.log("WebSocket 연결 시도 중:", SERVER_URL);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

      // 1️⃣ 내가 보낸 메시지를 먼저 화면에 추가
      setMessages((prev) => [...prev, messageData]);

      // 2️⃣ 소켓을 통해 서버로 메시지 전송
      socket.emit("chat", messageData);

      // 3️⃣ 입력창 초기화
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
    <div className="z-[50] max-w-84 fixed bottom-4 right-4 bg-white h-[400px] max-h-[80vh] rounded-2xl shadow-xl transition-all duration-500 transform origin-bottom-right overflow-hidden">
      {!isChatting ? (
        <div className="flex flex-col justify-around w-full h-full items-center">
          <img src={logoImg} className="w-24 h-auto self-start ml-8 -mt-4 " />
          <div className="form w-4/5 max-w-md p-6 ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b-4 border-gray-600 inline-block">
              채팅방 입장하기
            </h2>
            <div className="mb-5">
              <label className="block text-sm text-gray-600 mb-2">
                닉네임 입력
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-400 text-lg rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              onClick={handleJoin}
              className="w-full py-2 bg-gradient-to-r from-lime-300 to-lime-500 text-white text-lg rounded-lg hover:from-lime-400 hover:to-lime-600 shadow-lg transition-all duration-300"
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
        <div className="flex flex-col w-full h-full ">
          {/* 헤더 부분 */}
          <div className="backdrop-blur-md bg-gradient-to-r from-lime-300 to-teal-500 border-b border-gray-300 h-14 flex justify-between items-center px-6 text-white rounded-t-2xl shadow-lg">
            <div className="text-xl drop-shadow font-bold tracking-wide">
              💬 실시간 채팅방
            </div>
            <button
              onClick={handleExitChat}
              className="p-2 bg-white rounded-xl hover:bg-gray-300"
            >
              <img src={exitIcn} className="w-5 h-5" />
            </button>
          </div>
          {/* 채팅 메시지 */}
          <div className=" flex-1 bg-gray-100 p-4 overflow-auto ">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex my-2 ${
                  msg.type === "my" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "update" ? (
                  <div className="w-full flex justify-center items-center font-thin text-center italic text-gray-500">
                    {msg.text}
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] p-3 shadow-md rounded-lg ${
                      msg.type === "my" ? "bg-lime-300" : "bg-white"
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
            {/* 스크롤 조정을 위한 빈 요소 */}
            <div ref={messagesEndRef} />
          </div>
          {/* 채팅 입력창 */}
          <div className="w-full flex border-t h-[60px] items-center bg-white rounded-b-2xl shadow-md">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.repeat) {
                  // ⬅️ 중복 실행 방지
                  e.preventDefault(); // ⬅️ 기본 동작 방지 (특히 Safari에서)
                  handleSendMessage();
                }
              }}
              className="w-full px-4 text-lg border-none outline-none"
              placeholder="메시지를 입력하세요..."
            />
            <button
              onClick={handleSendMessage}
              className="m-1 px-5 py-2 bg-gradient-to-b from-gray-900 to-black text-white text-lg rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl active:scale-95 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
