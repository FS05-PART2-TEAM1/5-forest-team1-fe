import { useState } from "react";
import chatIcon from "../assets/chat-group.png";

export function ChatButton() {
  const [isChat, setIsChat] = useState(false);

  const handleChat = () => {
    setIsChat((prev) => !prev);
  };

  return (
    <>
      {/* 채팅 버튼 */}
      {!isChat && (
        <div
          className="cursor-pointer fixed bottom-4 right-4 bg-amber-700 rounded-full"
          onClick={handleChat}
        >
          <img src={chatIcon} width={50} />
        </div>
      )}

      {/* 채팅창 */}
      <div
        className={`fixed bottom-4 right-4 bg-white border-gray-300 border-2 w-72 h-96 rounded-3xl shadow-xl z-50
          transition-all duration-500 transform origin-bottom-right ${
            isChat
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex justify-end text-16pt p-4 text-stone-400">
          <div onClick={handleChat} className="cursor-pointer w-24">
            채팅방 나가기
          </div>
        </div>
        <div>여기에 채팅방 넣기</div>
      </div>
    </>
  );
}
