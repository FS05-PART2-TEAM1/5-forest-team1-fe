import React, { useState } from "react";
import deleteHabitImg from "./img/deleteHabit.png";
import addHabitImg from "./img/addHabit.png";

const HabitListModal = ({ isOpen, onClose, onSave }) => {
  const [habits, setHabits] = useState([]);

  if (!isOpen) return null;

  const addHabit = () => {
    const newHabit = prompt("새로운 습관을 입력하세요.");
    if (newHabit) setHabits([...habits, newHabit]);
  };

  const removeHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-white rounded-[20px] shadow-xl p-6 w-[648px] max-h-[90vh] font-sans flex flex-col">
        <h2 className="text-[24px] font-bold text-[#414141] text-center">
          습관 목록
        </h2>

        <div className="flex flex-col gap-[20px] px-[100px] mt-6 overflow-y-auto max-h-[60vh]">
          <ul className="relative flex flex-col gap-[20px]">
            {habits.map((habit, index) => (
              <li
                key={index}
                className="relative flex items-center justify-center bg-[#EEEEEE] rounded-[20px] h-[54px]"
              >
                <span className="text-[16px] text-[#818181] underline">
                  {habit}
                </span>

                <button
                  onClick={() => removeHabit(index)}
                  className="absolute -right-[56px] top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#FDE0E9] rounded-full"
                >
                  <img src={deleteHabitImg} alt="삭제" className="w-6 h-6" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={addHabit}
            className="w-full flex justify-center items-center border-2 border-black rounded-[20px] h-[54px] p-0"
          >
            <img src={addHabitImg} alt="추가" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-between gap-6 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-3 bg-[#DDDDDD] text-white  rounded-lg w-1/2"
          >
            닫기
          </button>
          <button
            onClick={onSave}
            className="px-5 py-3 bg-[#99C08E] text-white rounded-lg w-1/2"
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitListModal;
