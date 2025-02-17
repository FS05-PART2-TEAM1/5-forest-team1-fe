import { useState } from "react";
import { ChatButton } from "./ChatButton"; // ChatButton 컴포넌트
import { ChatApp } from "./ChatApp"; // ChatApp 컴포넌트

export function ChatContainer() {
  const [isChat, setIsChat] = useState(false);

  const toggleChat = () => {
    setIsChat((prev) => !prev);
  };

  return (
    <div>
      {/* ChatButton 클릭 시 상태 변화 */}
      <ChatButton isChat={isChat} toggleChat={toggleChat} />

      {/* ChatApp 컴포넌트 렌더링 */}
      {isChat && <ChatApp toggleChat={toggleChat} />}
    </div>
  );
}
