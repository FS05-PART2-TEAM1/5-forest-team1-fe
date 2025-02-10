import React, { useState, useEffect } from "react";
import paw from "../assets/icons/ic_paw.png";
import completedPaw from "../assets/icons/ic_selected.png";
import completeImg1 from "../assets/icons/paws/paw01.png";
import completeImg2 from "../assets/icons/paws/paw02.png";
import completeImg3 from "../assets/icons/paws/paw03.png";
import completeImg4 from "../assets/icons/paws/paw04.png";
import completeImg5 from "../assets/icons/paws/paw05.png";
import habitApi from "../api/habitApi";

function HabitTracker() {
  const [habitList, setHabitList] = useState([]);
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const getDayIndex = (dateString) => {
    const date = new Date(dateString);
    date.setUTCHours(date.getUTCHours() + 9); // UTC+9 한국 시간으로 변환

    const dayIndex = date.getDay(); // 0 (일요일) ~ 6 (토요일)
    return dayIndex === 0 ? 6 : dayIndex - 1; // 월요일(0) ~ 일요일(6)로 맞춤
  };
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const studyId = "eb119bc0-57d9-4c6c-ad2b-1c3c05a7d12f";
        const start = "2025-02-02";
        const end = "2025-02-09";
        const data = await habitApi.getHabits(studyId, start, end);
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
  const habitImages = [
    completeImg1,
    completeImg2,
    completeImg3,
    completeImg4,
    completeImg5,
  ];

  return (
    <div className="flex justify-center items-center mt-5 mb-[171px]">
      <div className="rounded-xl border lg:mt-[27px] lg:mb-32 lg:max-w-[1120px] lg:h-[511px] w-full min-w-[312px] min-h-[450px] bg-white p-4 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">습관 기록표</h1>

        <section className="p-4 mt-10">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-9 gap-2 md:gap-4 items-center text-[12px] sm:text-[14px] md:text-[18px] mb-4">
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
              className="grid grid-cols-9 gap-2 md:gap-4 items-center mb-4"
            >
              {/* 습관 이름 */}
              <div className="col-span-2 font-medium text-[12px] sm:text-[14px] md:text-[18px] text-right pr-2 sm:pr-4 whitespace-normal max-w-[200px]">
                {habit.name}
              </div>

              {/* paw 이미지 */}
              <div className="col-span-7 grid grid-cols-7 gap-1 sm:gap-2 md:gap-4">
                {days.map((_, dayIndex) => {
                  const habitStatus = habit.dailyHabitCheck.find(
                    (check) => getDayIndex(check.date) === dayIndex
                  );
                  return (
                    <img
                      key={dayIndex}
                      src={
                        habitStatus && habitStatus.status ? completedPaw : paw
                      }
                      alt="paw"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default HabitTracker;
