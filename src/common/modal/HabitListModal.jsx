import React, { useState, useEffect } from "react";
import deleteHabitImg from "./img/deleteHabit.png";
import addHabitImg from "./img/addHabit.png";
import ModalButton from "../buttons/ModalButton";
import HabitEditModal from "./HabitEditModal"; // 새로 만든 모달 import

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
  const [deletedHabits, setDeletedHabits] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setEditableHabits([...habits]);
  }, [habits]);

  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditModalOpen(true);
  };

  const handleEditSave = (newName) => {
    if (newName.trim() === "") {
      alert("습관 이름을 입력해주세요.");
      return;
    }
    if (newName.length > 20) {
      alert("습관 이름은 최대 20자까지 입력 가능합니다.");
      return;
    }

    if (isAdding) {
      // 추가 모드일 때
      const newHabit = { id: null, name: newName.trim(), deletedAt: null };
      setEditableHabits([...editableHabits, newHabit]);
    } else if (editingIndex !== null) {
      // 수정 모드일 때
      const updatedHabits = [...editableHabits];
      updatedHabits[editingIndex].name = newName;
      setEditableHabits(updatedHabits);
    }

    setEditModalOpen(false);
    setIsAdding(false);
  };

  const handleRemoveHabit = (index) => {
    const habitToRemove = editableHabits[index];

    if (habitToRemove.id) {
      setDeletedHabits((prev) => [
        ...prev,
        { ...habitToRemove, deletedAt: new Date().toISOString() },
      ]);
    }

    setEditableHabits((prevEditable) =>
      prevEditable.filter((_, i) => i !== index)
    );
  };

  const handleAddHabit = () => {
    if (editableHabits.length < maxHabitCount) {
      setIsAdding(true);
      setEditingIndex(null); // 추가 모드니까 index는 null로
      setEditModalOpen(true);
    } else {
      alert("습관은 최대 8개까지만 추가할 수 있습니다.");
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    await onSave([...editableHabits, ...deletedHabits]);
    setIsSaving(false);
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
                  <span
                    className="text-[16px] text-[#818181] select-none cursor-pointer font-bold underline underline-offset-4"
                    onClick={() => openEditModal(index)}
                  >
                    {habit.name}
                  </span>
                  {onRemoveHabit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveHabit(index);
                      }}
                      className="absolute -right-[56px] top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#FDE0E9] rounded-full"
                    >
                      <img
                        src={deleteHabitImg}
                        alt="삭제"
                        className="w-6 h-6"
                        draggable="false"
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
            onClick={handleSave}
            className="px-5 py-3 bg-[#99C08E] text-white rounded-lg w-1/2"
          >
            수정완료
          </ModalButton>
        </div>
      </div>

      {/* ✅ 습관 수정 모달 */}
      <HabitEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setIsAdding(false);
        }}
        initialName={isAdding ? "" : editableHabits[editingIndex]?.name || ""}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default HabitListModal;
