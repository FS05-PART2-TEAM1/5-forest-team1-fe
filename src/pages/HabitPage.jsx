// HabitPage.jsx
import React, { useState } from "react";
import HabitListModal from "../common/modal/HabitListModal";

function HabitPage() {
  // 모달 열림 여부 및 습관 목록 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달의 수정완료 버튼 클릭 시 로직 (여기서는 알림 후 모달 닫기)
  const handleSave = () => {
    alert("습관 목록이 수정되었습니다.");
    setIsModalOpen(false);
  };

  // 습관 추가 로직: prompt를 통해 입력받고 상태 업데이트
  const addHabit = () => {
    const newHabit = prompt("새로운 습관을 입력하세요.");
    if (newHabit) {
      setHabits([...habits, newHabit]);
    }
  };

  // 습관 삭제 로직: 전달받은 인덱스의 습관 제거
  const removeHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">오늘의 습관 페이지</h1>
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        습관 목록 수정하기
      </button>

      {/* HabitListModal 컴포넌트 사용 */}
      <HabitListModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        habits={habits} // 습관 목록 전달
        onAddHabit={addHabit} // 습관 추가 기능 전달
        onRemoveHabit={removeHabit} // 습관 삭제 기능 전달
      />
    </div>
  );
}

export default HabitPage;
