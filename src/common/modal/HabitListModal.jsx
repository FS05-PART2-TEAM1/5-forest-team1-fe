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

  // ✅ 모달에서 수정할 습관 목록
  const [editableHabits, setEditableHabits] = useState([...habits]);
  const [deletedHabits, setDeletedHabits] = useState([]); // 삭제된 습관 저장

  useEffect(() => {
    setEditableHabits([...habits]); // habits 변경 시 editableHabits 동기화
  }, [habits]);

  // ✅ 습관 삭제 함수 (UI에서도 즉시 반영 & 삭제된 습관 저장)
  const handleRemoveHabit = (index) => {
    const habitToRemove = editableHabits[index];

    // ✅ 기존 습관이라면 삭제 리스트에 추가 (서버에서 삭제 요청 필요)
    if (habitToRemove.id) {
      setDeletedHabits((prev) => [
        ...prev,
        { ...habitToRemove, deletedAt: new Date().toISOString() },
      ]);
    }

    // ✅ UI에서 즉시 삭제 반영
    setEditableHabits((prevEditable) =>
      prevEditable.filter((_, i) => i !== index)
    );
  };

  // ✅ 습관 추가
  const handleAddHabit = () => {
    if (editableHabits.length < maxHabitCount) {
      const newHabitName = prompt("새로운 습관을 입력하세요:");
      if (newHabitName) {
        setEditableHabits([
          ...editableHabits,
          { id: null, name: newHabitName, deletedAt: null },
        ]);
      }
    } else {
      alert("습관은 최대 8개까지만 추가할 수 있습니다.");
    }
  };

  // ✅ 수정 완료 버튼 클릭 시 실행
  const handleSave = () => {
    onSave([...editableHabits, ...deletedHabits]); // ✅ 삭제된 습관도 함께 전송
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <div className="bg-white rounded-[20px] shadow-xl p-6 w-[698px] max-h-[90vh] font-sans flex flex-col">
        <h2 className="text-[24px] font-bold text-[#414141] text-center">
          습관 목록
        </h2>

        <div className="flex flex-col gap-[20px] px-[100px] mt-6 overflow-y-auto max-h-[60vh] max-[763px]:px-0 max-[763px]:gap-[8px]">
          <ul className="relative flex flex-col gap-[20px] max-[763px]:gap-[8px] max-[763px]:pr-[56px]">
            {editableHabits.length > 0 ? (
              editableHabits.map((habit, index) => (
                <li
                  key={index}
                  className="relative flex items-center justify-center bg-[#EEEEEE] rounded-[20px] h-[54px]"
                >
                  <input
                    type="text"
                    className="text-[16px] text-[#818181] underline select-none text-center w-full bg-transparent border-none outline-none cursor-pointer"
                    value={habit.name}
                    onChange={(e) => {
                      const updatedHabits = [...editableHabits];
                      updatedHabits[index].name = e.target.value;
                      setEditableHabits(updatedHabits);
                    }}
                    style={{ userSelect: "none" }}
                  />
                  {onRemoveHabit && (
                    <button
                      onClick={() => handleRemoveHabit(index)}
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
              <li className="text-center text-[#818181]">
                아직 생성된 습관이 없습니다.
              </li>
            )}
          </ul>

          {onAddHabit &&
            (typeof maxHabitCount === "undefined" ||
              editableHabits.length < maxHabitCount) && (
              <button
                onClick={handleAddHabit}
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
            onClick={handleSave} // ✅ 삭제된 습관도 포함하여 저장
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
