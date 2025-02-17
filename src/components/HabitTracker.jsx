import React, { useState, useEffect } from "react";
import PawDelete from "../assets/icons/paw_delete.png";
import Paw1 from "../assets/icons/paws/paw01.png";
import Paw2 from "../assets/icons/paws/paw02.png";
import Paw3 from "../assets/icons/paws/paw03.png";
import Paw4 from "../assets/icons/paws/paw04.png";
import Paw5 from "../assets/icons/paws/paw05.png";
import Paw6 from "../assets/icons/paws/paw06.png";
import Paw7 from "../assets/icons/paws/paw07.png";
import Paw8 from "../assets/icons/paws/paw08.png";
import paw from "@assets/icons/paws/paw.png";
import habitApi from "../api/habitApi";
import { startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns";

function HabitTracker({ studyId }) {
  const [habitList, setHabitList] = useState([]);
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const getDayIndex = (dateString) => {
    const date = new Date(dateString);
    return (date.getDay() + 6) % 7; // 일요일(0) -> 6으로 변환
  };

  const todayIndex = getDayIndex(new Date()); // 오늘 날짜의 요일 인덱스

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const today = new Date();
        const weekStart = startOfWeek(today, { weekStartsOn: 1 }); //월요일부터
        const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); //일요일까지
        console.log("weekStart: ", weekStart, "weekEnd", weekEnd);
        console.log(studyId);

        const data = await habitApi.getHabits(studyId, weekStart, weekEnd);
        console.log(studyId);
        console.log("Raw Data from API:", data);

        setHabitList(data.habitList); // 여기서 데이터 설정!
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchHabits();
  }, []);
  console.log(new Date());

  const habitImages = [Paw1, Paw2, Paw3, Paw4, Paw5, Paw6, Paw7, Paw8];

  return (
    <div className="w-full items-center mt-5">
      <div className="rounded-xl border lg:mt-[27px] lg:mb-5 lg:max-h-[511px] w-full bg-white p-6 py-5 transition-all duration-100">
        <h1 className="md:text-2xl text-lg font-bold">습관 기록표</h1>

        <div className="mt-2 scrollbar-hide overflow-x-auto overflow-y-scroll md:overflow-y-auto lg:overflow-y-auto max-h-[380px] md:max-h-[430px]">
          {/* 요일 헤더 */}
          <div className="min-w-[648px] grid grid-cols-9 gap-2 items-center sm:text-[14px] md:text-[18px] mb-4">
            <div className="col-span-2"></div>
            {days.map((day, index) => (
              <div
                key={day}
                className="relative flex items-center justify-center text-center text-gray-500 font-semibold p-2"
              >
                {index === todayIndex && (
                  <div className="absolute w-10 h-10 bg-yellow-200 rounded-full z-0"></div>
                )}
                <span className="relative z-10">{day}</span>
              </div>
            ))}
          </div>

          {/* 습관 목록 */}
          {habitList.slice(0, 8).map((habit, habitIndex) => (
              !habit.deletedAt && 
              <div
              key={habit.id}
              className="grid grid-cols-9 gap-2 md:gap-4 items-center mb-4 min-w-[648px]"
            >
              {/* 습관 이름 */}
                <div className="col-span-2 font-medium text-[14px] md:text-[18px] text-right whitespace-normal max-w-[110px] md:max-w-[200px]">
                {habit.name}
              </div>

              {/* paw 이미지 */}
                <div className="col-span-7 grid grid-cols-7 gap-2">
                  {!habit.deletedAt &&
                    days.map((_, dayIndex) => {
                      const habitStatus = habit.dailyHabitCheck.find(
                        (check) => getDayIndex(check.date) === dayIndex
                      );

                      const isDeletedForThisDay =
                        habit.deletedAt &&
                        new Date(habit.deletedAt).setHours(0, 0, 0, 0) <=
                          new Date(habitStatus?.date).setHours(0, 0, 0, 0);

                      const pawImage =
                        habitImages[habitIndex % habitImages.length];
                      const isToday = dayIndex === todayIndex; // 오늘 날짜인지 확인

                      return (
                        <img
                          key={dayIndex}
                          src={
                            isDeletedForThisDay ||
                            (habitStatus === undefined &&
                              habit.deletedAt &&
                              new Date(habit.deletedAt).getDay() <=
                                dayIndex + 1)
                              ? PawDelete
                              : habitStatus?.status
                              ? pawImage
                              : paw
                          }
                          alt="paw"
                          className={`w-9 h-9 mx-auto my-2 transition-transform `}
                        />
                      );
                    })}
                </div>
            </div>
          ))
            }

        </div>
      </div>
    </div>
  );
}

export default HabitTracker;
