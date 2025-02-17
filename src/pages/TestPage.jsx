import { ChatContainer } from "@/components/ChatContainer";
import HabitTracker from "@/components/HabitTracker";
import React from "react";

const TestPage = () => {
  return (
    <div className="w-full  bg-[#F6F4EF] pt-56">
      <HabitTracker />
      <div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default TestPage;
