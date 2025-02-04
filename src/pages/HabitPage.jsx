import React, { useState } from "react";
import HabitListModal from "../common/modal/HabitListModal";

function HabitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 (닫기 버튼 클릭 시)
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 수정완료 버튼 클릭 시 로직
  const handleSave = () => {
    // 수정 완료 시 원하는 로직 추가 (예: 서버에 데이터 전송)
    alert("습관 목록이 수정되었습니다.");
    setIsModalOpen(false);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">오늘의 습관 페이지 - 가승연</h1>{" "}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <button
          onClick={openModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg mb-4"
        >
          습관 목록 수정하기
        </button>

        {/* HabitListModal 컴포넌트 사용 */}
        <HabitListModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default HabitPage;
