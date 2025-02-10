import React, { useState, useEffect } from "react";
import { Header } from "@/common/layout/Header";
import { Link, useLocation } from "react-router-dom";
import HabitListModal from "../common/modal/HabitListModal";
import { getStudy, getHabits } from "@/api/habitApi";

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
    <div className="border border-gray-400 px-2 py-1 rounded-[50px] text-[#000000] text-[16px] text-center w-[200px] font-pretendard font-medium">
      {currentTime}
    </div>
  );
};

function HabitPage() {
  const location = useLocation();
  const { studyData } = location.state || {};
  const [title, setTitle] = useState(studyData?.title || "");
  const [nickname, setNickname] = useState(studyData?.nickname || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState(
    studyData?.habits?.map((habit) => habit.name) || []
  );
  const [selectedHabits, setSelectedHabits] = useState([]);
  const maxHabitCount = 8;

  useEffect(() => {
    if (studyData?.habits) {
      setHabits(studyData.habits.map((habit) => habit.name));
    }
  }, [studyData]);

  useEffect(() => {
    async function fetchHabits() {
      const studyId = studyData?.id;
      if (studyId) {
        const habitList = await getHabits(studyId);
        setHabits(habitList);
      }
    }
    fetchHabits();
  }, [studyData]);

  const onAddHabit = () => {
    if (habits.length < maxHabitCount) {
      const newHabit = prompt("새로운 습관을 입력하세요:");
      if (newHabit) {
        setHabits([...habits, newHabit]);
      }
    } else {
      alert("습관은 최대 10개까지만 추가할 수 있습니다.");
    }
  };

  const onRemoveHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);

    setSelectedHabits(selectedHabits.filter((_, i) => i !== index));
  };

  const onSave = async (updatedHabits) => {
    setHabits([...updatedHabits]);
  };

  const onToggleHabit = (index) => {
    if (selectedHabits.includes(index)) {
      setSelectedHabits(selectedHabits.filter((i) => i !== index));
    } else {
      setSelectedHabits([...selectedHabits, index]);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#F6F4EF] pt-4">
        <Header />
        <main className="p-[20px] sm:p-[16px_24px] md:p-[16px_24px]">
          <div className="bg-white rounded-lg shadow p-6 min-[1200px]:w-[1150px] mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {nickname && title
                  ? `${nickname} 의 ${title}`
                  : "스터디 정보 없음"}
              </h2>
              <div className="flex gap-4 items-center">
                <Link to="/focus">
                  <button className="border py-2 pl-[10px] pr-[6px] md:py-3 md:pl-6 md:pr-[16px] rounded-xl text-[#818181] md:w-[144px] md:h-[48px] w-[120px] h-[40px] ">
                    오늘의 집중 <span>&gt;</span>
                  </button>
                </Link>
                <Link to="/">
                  <button className="border py-2 pl-[16px] pr-[10px] rounded-xl text-[#818181] w-[58px] h-[40px] md:w-[82px] md:h-[48px] md:py-3 md:pl-6 md:pr-[16px]">
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
                      <li
                        key={index}
                        className={` text-[20px] w-[280px] h-[54px] md:w-[480px] md:h-[54px] rounded-[20px] flex items-center justify-center cursor-pointer
                          ${
                            selectedHabits.includes(index)
                              ? "bg-[#99C08E] text-white"
                              : "bg-[#EEEEEE]"
                          }`}
                        onClick={() => onToggleHabit(index)}
                      >
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
        userId={"439420f4-4631-43a7-962a-cf1ec7b7ce53"}
      />
    </>
  );
}

export default HabitPage;
