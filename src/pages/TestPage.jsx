import { ChatContainer } from "@/components/ChatContainer";
import React from "react";
import Home from "./home";

const TestPage = () => {
  return (
    <div className="w-full  bg-[#F6F4EF] pt-56">
      <Home />
      <div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default TestPage;
