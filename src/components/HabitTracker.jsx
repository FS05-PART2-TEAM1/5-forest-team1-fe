import React, { useState, useEffect } from "react";
import paw from "../assets/icons/ic_paw.png";
import Paw1 from "../assets/icons/paws/paw01.png";
import Paw2 from "../assets/icons/paws/paw02.png";
import Paw3 from "../assets/icons/paws/paw03.png";
import Paw4 from "../assets/icons/paws/paw04.png";
import Paw5 from "../assets/icons/paws/paw05.png";
import Paw6 from "../assets/icons/paws/paw06.png";
import Paw7 from "../assets/icons/paws/paw07.png";
import Paw8 from "../assets/icons/paws/paw08.png";
import useWheelScroll from "@/hooks/useWheelScroll";
import habitApi from "../api/habitApi";

function HabitTracker() {
  const [habitList, setHabitList] = useState([]);
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const { scrollRef } = useWheelScroll();

  const getDayIndex = (dateString) => {
    const date = new Date(dateString);
    date.setUTCHours(date.getUTCHours() + 9); // UTC+9 한국 시간으로 변환
    const now = new Date();

    const dayIndex = date.getDay(); // 0 (일요일) ~ 6 (토요일)
    return dayIndex === 0 ? 6 : dayIndex - 1; // 월요일(0) ~ 일요일(6)로 맞춤
  };
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const studyId = "eb119bc0-57d9-4c6c-ad2b-1c3c05a7d12f";
        const start = "2025-02-04";
        const end = "2025-02-10";
        const data = await habitApi.getHabits(studyId, start, end);
        console.log("Raw Data from API:", data); // habitList 전체 확인
        setHabitList(data.habitList); // 여기서 데이터 설정!
        console.log(data.habitList);
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchHabits();
  }, []);

  const mappedDays = habitList.map((habit) =>
    habit.dailyHabitCheck.map((entry) => ({
      date: entry.date,
      status: entry.status,
      dayIndex: getDayIndex(entry.date),
    }))
  );

  console.log(mappedDays);

  // Habit-specific image mapping
  const habitImages = [Paw1, Paw2, Paw3, Paw4, Paw5, Paw6, Paw7, Paw8];

  return (
    <div className="flex justify-center items-center mt-5 mb-[171px]">
      <div className="rounded-xl border lg:mt-[27px] lg:mb-32 lg:max-w-[1120px] lg:h-[511px] md:max-w-[648px] h-[450px] max-w-[312px]  bg-white p-4 transition-all duration-300">
        <h1 className="md:text-2xl text-lg font-bold ">습관 기록표</h1>

        <div
          ref={scrollRef}
          className="mt-2 overflow-x-auto overflow-y-scroll max-h-[380px] md:max-h-[400px]"
        >
          {/* 요일 헤더 */}
          <div className="min-w-[648px] grid grid-cols-9 gap-2 md:gap-4 items-center sm:text-[14px] md:text-[18px] mb-4">
            <div className="col-span-2"></div>
            {days.map((day) => (
              <div
                key={day}
                className="text-center text-gray-500 font-semibold"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 습관 목록 */}
          {habitList.map((habit, habitIndex) => (
            <div
              key={habit.id}
              className="grid grid-cols-9 gap-2 md:gap-4 items-center mb-4 min-w-[648px]"
            >
              {/* 습관 이름 */}
              <div className="col-span-2 font-medium text-[14px] md:text-[18px] text-right  whitespace-normal max-w-[110px] md:max-w-[200px]">
                {habit.name}
              </div>

              {/* paw 이미지 */}
              <div className="col-span-7 grid grid-cols-7 gap-4">
                {days.map((_, dayIndex) => {
                  const habitStatus = habit.dailyHabitCheck.find(
                    (check) => getDayIndex(check.date) === dayIndex
                  );

                  // habitIndex를 사용해 해당 색상의 paw 이미지 선택
                  const pawImage = habitImages[habitIndex % habitImages.length];

                  return (
                    <img
                      key={dayIndex}
                      src={habitStatus && habitStatus.status ? pawImage : paw} // status가 true면 컬러 paw, false면 기본 paw
                      alt="paw"
                      className="w-9 h-9 mx-auto my-2"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitTracker;
