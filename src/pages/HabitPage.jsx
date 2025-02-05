import React from "react";
import HeaderImage from "../assets/icons/img_logo.png";

function HabitPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      {/* Header */}
      <header className="flex items-center bg-[#F6F4EF]  h-[100px] bg">
        <img
          src={HeaderImage}
          alt="헤더 이미지"
          className="
            max-[763px]:w-[102px] 
            max-[763px]:pl-[16px] max-[763px]:pt-[32px] max-[763px]:pb-[32px]
            min-[764px]:pl-[24px]
            min-[1200px]:pl-[220px] min-[1200px]:pt-[20px] min-[1200px]:pb-[20px]
          "
        />
      </header>

      {/* Main Content */}
      <main className="p-[20px] sm:p-[16px_24px] md:p-[16px_24px] ">
        <div className="bg-white rounded-lg shadow p-6 min-[1200px]:w-[1248px] mx-auto">
          <h2 className="text-2xl font-semibold mb-4">스터디 컨테이너</h2>
          <p>여기에 스터디 관련 내용</p>
          {/* 추가적인 스터디 관련 컴포넌트나 UI 요소를 이곳에 추가하세요 */}
        </div>
      </main>
    </div>
  );
}

export default HabitPage;
