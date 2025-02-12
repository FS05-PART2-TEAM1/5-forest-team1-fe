// HabitListModal.jsx
import React, { useState, useEffect } from "react";
import deleteHabitImg from "./img/deleteHabit.png";
import addHabitImg from "./img/addHabit.png";
import ModalButton from "../buttons/ModalButton";

const HabitListModal = ({
  isOpen,
  onClose,
  onSave,
  habits = [],
  onAddHabit,
  onRemoveHabit,
  maxHabitCount,
}) => {
  if (!isOpen) return null;
  const [editableHabits, setEditableHabits] = useState([...habits]);

  // ✅ habits 변경 시 editableHabits 동기화
  useEffect(() => {
    setEditableHabits([...habits]);
  }, [habits]);

  // ✅ 습관 이름 변경 핸들러
  const handleHabitChange = (index, newName) => {
    const updatedHabits = [...editableHabits];
    updatedHabits[index] = newName;
    setEditableHabits(updatedHabits);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-white rounded-[20px] shadow-xl p-6 w-[698px] max-h-[90vh] font-sans flex flex-col">
        <h2 className="text-[24px] font-bold text-[#414141] text-center">
          습관 목록
        </h2>

        <div className="flex flex-col gap-[20px] px-[100px] mt-6 overflow-y-auto max-h-[60vh] max-[763px]:px-0 max-[763px]:gap-[8px]">
          <ul className="relative flex flex-col gap-[20px] max-[763px]:gap-[8px] max-[763px]:pr-[56px]">
            {habits.length > 0 ? (
              habits.map((habit, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-center bg-[#EEEEEE] rounded-[20px] h-[54px]"
                >
                  <input
                    type="text"
                    className="text-[16px] text-[#818181] underline select-none text-center w-full bg-transparent border-none outline-none"
                    value={editableHabits[index]}
                    onChange={(e) => handleHabitChange(index, e.target.value)}
                    style={{ userSelect: "none" }}
                  ></input>
                  {onRemoveHabit && (
                    <button
                      onClick={() => onRemoveHabit(index)}
                      className="absolute -right-[56px] top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#FDE0E9] rounded-full"
                    >
                      <img
                        src={deleteHabitImg}
                        alt="삭제"
                        className="w-6 h-6"
                      />
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="text-center text-[#818181]"></li>
            )}
          </ul>

          {onAddHabit &&
            (typeof maxHabitCount === "undefined" ||
              habits.length < maxHabitCount) && (
              <button
                onClick={onAddHabit}
                className="w-full flex justify-center items-center border-2 border-black rounded-[20px] h-[54px] p-0 "
              >
                <img src={addHabitImg} alt="추가" className="w-6 h-6" />
              </button>
            )}
        </div>

        <div className="flex justify-between gap-6 mt-6">
          <ModalButton
            isCancel={true}
            onClick={onClose}
            className="px-5 py-3 bg-[#DDDDDD] text-white rounded-lg w-1/2"
          >
            닫기
          </ModalButton>
          <ModalButton
            onClick={() => onSave(editableHabits)}
            className="px-5 py-3 bg-[#99C08E] text-white rounded-lg w-1/2"
          >
            수정완료
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default HabitListModal;
