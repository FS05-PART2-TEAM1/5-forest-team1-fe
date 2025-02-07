import React, { useState, useEffect } from "react";
import deleteHabitImg from "./img/deleteHabit.png";
import addHabitImg from "./img/addHabit.png";
import ModalButton from "../buttons/ModalButton";
import axios from "axios";

const HabitListModal = ({
  isOpen,
  onClose,
  onSave,
  habits = [],
  onAddHabit,
  onRemoveHabit,
  maxHabitCount,
  userId, // 사용자 ID (API 요청에 필요)
}) => {
  const [editedHabits, setEditedHabits] = useState([...habits]);

  // 모달이 열릴 때 원래 데이터로 초기화
  useEffect(() => {
    if (isOpen) {
      setEditedHabits([...habits]);
    }
  }, [isOpen, habits]);

  // 습관 추가 (단순히 editedHabits에만 추가)
  const handleAddHabit = () => {
    if (!onAddHabit) return;
    if (
      typeof maxHabitCount !== "undefined" &&
      editedHabits.length >= maxHabitCount
    )
      return;

    const newHabit = prompt("추가할 습관을 입력하세요:");
    if (newHabit) {
      setEditedHabits([...editedHabits, newHabit]);
    }
  };

  // 습관 삭제 (editedHabits에서만 제거)
  const handleRemoveHabit = (index) => {
    setEditedHabits(editedHabits.filter((_, i) => i !== index));
  };

  // 수정 버튼 클릭 시 API 요청
  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/habits/${userId}`, {
        habits: editedHabits,
      });
      console.log("수정 완료:", response.data);

      // 부모 컴포넌트에도 변경 사항 전달
      onSave(editedHabits);
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("습관 저장 중 오류 발생:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-white rounded-[20px] shadow-xl p-6 w-[698px] max-h-[90vh] font-sans flex flex-col">
        <h2 className="text-[24px] font-bold text-[#414141] text-center">
          습관 목록
        </h2>

        <div className="flex flex-col gap-[20px] px-[100px] mt-6 overflow-y-auto max-h-[60vh]">
          <ul className="relative flex flex-col gap-[20px]">
            {editedHabits.length > 0 ? (
              editedHabits.map((habit, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-center bg-[#EEEEEE] rounded-[20px] h-[54px]"
                >
                  <span className="text-[16px] text-[#818181] underline">
                    {habit}
                  </span>
                  <button
                    onClick={() => handleRemoveHabit(index)}
                    className="absolute -right-[56px] top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#FDE0E9] rounded-full"
                  >
                    <img src={deleteHabitImg} alt="삭제" className="w-6 h-6" />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-center text-[#818181]">
                추가된 습관이 없습니다.
              </li>
            )}
          </ul>

          {(typeof maxHabitCount === "undefined" ||
            editedHabits.length < maxHabitCount) && (
            <button
              onClick={handleAddHabit}
              className="w-full flex justify-center items-center border-2 border-black rounded-[20px] h-[54px] p-0"
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
            취소
          </ModalButton>
          <ModalButton
            onClick={handleSave}
            className="px-5 py-3 bg-[#99C08E] text-white rounded-lg w-1/2"
          >
            수정
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default HabitListModal;
