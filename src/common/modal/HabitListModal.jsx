import React, { useState, useEffect } from "react";
import deleteHabitImg from "./img/deleteHabit.png";
import addHabitImg from "./img/addHabit.png";
import ModalButton from "../buttons/ModalButton";
import axios from "axios";
import { createHabit, updateStudy } from "../../api/habitApi";

const HabitListModal = ({
  isOpen,
  onClose,
  onSave,
  habits = [],
  maxHabitCount,
  userId,
}) => {
  const [originalHabits, setOriginalHabits] = useState([...habits]);
  const [pendingEdits, setPendingEdits] = useState([...habits]);

  useEffect(() => {
    if (isOpen) {
      setOriginalHabits([...habits]);
      setPendingEdits([...habits]);
    }
  }, [isOpen, habits]);

  const handleAddHabit = async () => {
    if (
      typeof maxHabitCount !== "undefined" &&
      pendingEdits.length >= maxHabitCount
    )
      return;

    const newHabitName = prompt("추가할 습관을 입력하세요:");
    if (newHabitName) {
      try {
        const newHabit = await createHabit(userId, newHabitName);

        if (newHabit) {
          const newHabitObj = {
            id: newHabit.id || `temp-${Date.now()}`,
            studyId: userId,
            name: newHabit.name || newHabit,
            deletedAt: null,
          };
          setPendingEdits([...pendingEdits, newHabitObj]);
        }
      } catch (error) {
        console.error("습관 추가 중 오류 발생:", error);
      }
    }
  };

  const handleRemoveHabit = (index) => {
    setPendingEdits((prev) =>
      prev.map((habit, i) =>
        i === index ? { ...habit, deletedAt: new Date().toISOString() } : habit
      )
    );

    console.log("🗑️ 삭제 후 pendingEdits:", pendingEdits);
  };

  const handleCancel = () => {
    setPendingEdits([...originalHabits]); // 원래 상태로 되돌림
    onClose(); // 모달 닫기
  };

  const handleSave = async () => {
    try {
      const updatedHabits = pendingEdits.map((habit) => ({
        id: habit.id || `temp-${Date.now()}`, // ✅ ID가 없을 경우 임시 ID 생성
        studyId: userId,
        name: habit.name || habit, // ✅ 문자열이 아니라면 name 속성으로 변환
        deletedAt: habit.deletedAt || null, // ✅ 삭제된 항목은 deletedAt 값을 유지
      }));

      console.log(
        "📡 [PATCH 요청 전송] 데이터:",
        JSON.stringify(updatedHabits, null, 2)
      );

      for (const habit of updatedHabits) {
        const response = await updateStudy(habit.id, {
          name: habit.name,
          deletedAt: habit.deletedAt || null,
        });

        if (!response) {
          alert("❌ 습관 업데이트 실패! 콘솔 로그를 확인하세요.");
          console.error("❌ [PATCH 요청 실패]:", habit);
        }
      }

      console.log("✅ 수정 완료");
      setOriginalHabits(updatedHabits); // ✅ 원본 상태 업데이트
      onSave(updatedHabits); // ✅ 부모 컴포넌트(HabitPage)에도 변경된 목록 전달
      onClose(); // ✅ 모달 닫기
    } catch (error) {
      console.error("❌ 습관 저장 중 오류 발생:", error);
      alert("❌ 습관 저장 중 오류 발생! 콘솔 로그를 확인하세요.");
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
            {pendingEdits.length > 0 ? (
              pendingEdits.map((habit, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-center bg-[#EEEEEE] rounded-[20px] h-[54px]"
                >
                  <span className="text-[16px] text-[#818181] underline">
                    {habit.name ? habit.name : habit}{" "}
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
            pendingEdits.length < maxHabitCount) && (
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
            onClick={handleCancel}
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
