import React, { useState, useEffect } from "react";
import { Header } from "@/common/layout/Header";
import { Link } from "react-router-dom";

const TimeBox = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  function getFormattedTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";

    hours = hours % 12 || 12; // 12시간 형식 변환

    return `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000); // 1분마다 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <div className="border border-gray-400 px-4 py-2 rounded-md text-[#818181] text-sm text-center w-[140px]">
      {currentTime}
    </div>
  );
};

function HabitPage() {
  return (
    <>
      <div className="min-h-screen bg-[#F6F4EF] pt-4">
        <Header />
        {/* Main Content */}
        <main className="p-[20px] sm:p-[16px_24px] md:p-[16px_24px]">
          <div className="bg-white rounded-lg shadow p-6 min-[1200px]:w-[1150px] mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold mb-4">스터디 이름</h2>
              <div className="flex gap-4 items-center">
                <Link to="/focus">
                  <button className="border py-3 pl-6 pr-4 rounded-xl text-[#818181]">
                    오늘의 집중 <span>&gt;</span>
                  </button>
                </Link>
                <Link to="/">
                  <button className="border py-3 pl-6 pr-4 rounded-xl text-[#818181]">
                    홈 <span>&gt;</span>
                  </button>
                </Link>
                {/* ✅ 현재 날짜 및 시간 표시 박스 */}
              </div>
            </div>
            <TimeBox />
            <p>여기에 스터디 관련 내용</p>
            {/* 추가적인 스터디 관련 컴포넌트나 UI 요소를 이곳에 추가하세요 */}
          </div>
        </main>
      </div>
    </>
  );
}

export default HabitPage;
