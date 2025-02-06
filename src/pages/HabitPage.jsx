import React, { useState, useEffect } from "react";
import { Header } from "@/common/layout/Header";
import { Link } from "react-router-dom";
import HabitListModal from "../common/modal/HabitListModal"; // 모달 import

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

    hours = hours % 12 || 12;

    return `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-gray-400 px-2 py-1 rounded-[50px] text-[#000000] text-[16px] text-center w-[200px] font-pretendard font-medium shadow-xl mt-2">
      {currentTime}
    </div>
  );
};

function HabitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const maxHabitCount = 5;

  const onAddHabit = () => {
    if (habits.length < maxHabitCount) {
      const newHabit = prompt("새로운 습관을 입력하세요:");
      if (newHabit) {
        setHabits([...habits, newHabit]);
      }
    } else {
      alert("최대 5개의 습관만 추가할 수 있습니다.");
    }
  };

  const onRemoveHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  const onSave = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F6F4EF] pt-4">
        <Header />
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
              </div>
            </div>
            <div className="text-[#818181] font[18px] font-pretendard font-normal">
              현재시간
            </div>
            <TimeBox />
            <div className="border rounded-lg mt-8 w-full h-[631px] flex flex-col items-center justify-between py-10 px-6">
              <div className="relative w-full flex justify-center items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 text-[18px] md:text-[24px] font-bold text-[#414141]">
                  오늘의 습관
                </div>

                <button
                  className="absolute left-1/2 transform -translate-x-1/2 ml-[90px] md:ml-[145px] text-[14px] text-[#818181] underline"
                  onClick={() => setIsModalOpen(true)}
                >
                  목록 수정
                </button>
              </div>

              <div className="h-[498px] flex justify-center items-center w-full">
                {habits.length > 0 ? (
                  <ul className="flex flex-col gap-3 text-center">
                    {habits.map((habit, index) => (
                      <li key={index} className="text-[#414141] text-[20px]">
                        {habit}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col justify-center items-center text-center text-[#818181] text-[20px]">
                    아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을
                    생성해보세요
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <HabitListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
        habits={habits}
        onAddHabit={onAddHabit}
        onRemoveHabit={onRemoveHabit}
        maxHabitCount={maxHabitCount}
      />
    </>
  );
}

export default HabitPage;
