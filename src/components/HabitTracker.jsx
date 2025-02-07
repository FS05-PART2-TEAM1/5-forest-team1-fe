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
      updated[habitIndex][dayIndex] = !updated[habitIndex][dayIndex];
      return updated;
    });
  };

  return (
    <div className="flex justify-center items-center bg-blue-950 bg-opacity-80">
      <div className="rounded-xl border lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[1120px] lg:h-[511px] md:w-[648px] md:h-[511px] w-[312px] h-[450px] bg-white p-4 overflow-x-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">습관 기록표</h1>
        </div>
        <section className="p-4">
          {/* 요일 헤더 */}

          <div className="grid grid-cols-8 gap-4 items-center text-[14px] md:text-[18px] mb-4">
            <div></div> {/* 빈칸 */}
            {days.map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* 습관 목록 */}
          {habits.map((habit, habitIndex) => (
            <div
              key={habitIndex}
              className="grid grid-cols-8 gap-4 items-center mb-4 whitespace-pre-wrap"
            >
              {/* 습관 이름: 줄바꿈 처리, 최대 너비 조정 */}
              <div className="col-span-1 font-medium text-[14px] md:text-[18px] text-right pr-4 w-[122px] md:max-w-[246px]">
                {habit.name}
              </div>
              <div className="col-span-7 grid grid-cols-7  gap-2 md:gap-4">
                {days.map((_, dayIndex) => (
                  <img
                    key={dayIndex}
                    src={completed[habitIndex][dayIndex] ? completedPaw : paw}
                    alt="paw"
                    className="w-6 h-6 md:w-8 md:h-8 md:mx-auto cursor-pointer"
                    onClick={() => toggleCompletion(habitIndex, dayIndex)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default HabitTracker;
