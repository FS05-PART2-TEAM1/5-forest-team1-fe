import React, { useState } from "react";
import paw from "../assets/icons/ic_paw.png";
import completedPaw from "../assets/icons/ic_selected.png";

function HabitTracker() {
  const habits = [
    { name: "미라클모닝 6시 기상" },
    { name: "아침 챙겨 먹기" },
    { name: "React 스터디 책 1챕터 읽기" },
    { name: "스트레칭" },
    { name: "사이드 프로젝트" },
    { name: "물 2L 마시기" },
  ];

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  // 완료 상태를 저장하는 state
  const [completed, setCompleted] = useState(
    habits.map(() => Array(days.length).fill(false))
  );

  // 완료 상태 토글 함수
  const toggleCompletion = (habitIndex, dayIndex) => {
    setCompleted((prev) => {
      const updated = [...prev];
      updated[habitIndex] = [...updated[habitIndex]];
      updated[habitIndex][dayIndex] = !updated[habitIndex][dayIndex];
      return updated;
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-xl border lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:max-w-[1120px] w-full bg-white p-4">
        {/* 추가된 wrapper div */}
        <div className="overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[600px] md:min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">습관 기록표</h1>
            </div>
            <section className="p-4">
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
              {habits.map((habit, habitIndex) => (
                <div
                  key={habitIndex}
                  className="grid grid-cols-9 gap-2 md:gap-4 items-center mb-4"
                >
                  {/* 습관 이름 */}
                  <div className="col-span-2 font-medium text-[12px] sm:text-[14px] md:text-[18px] text-right pr-2 sm:pr-4 max-w-[100px] sm:max-w-[200px] md:max-w-none whitespace-normal">
                    {habit.name}
                  </div>
                  {/* paw 이미지 */}
                  <div className="col-span-7 grid grid-cols-7 gap-1 sm:gap-2 md:gap-4">
                    {days.map((_, dayIndex) => (
                      <img
                        key={dayIndex}
                        src={
                          completed[habitIndex][dayIndex] ? completedPaw : paw
                        }
                        alt="paw"
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mx-auto cursor-pointer"
                        onClick={() => toggleCompletion(habitIndex, dayIndex)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HabitTracker;
