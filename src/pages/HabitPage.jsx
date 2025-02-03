import React, { useState } from "react";
import HabitListModal from "@/common/modal/HabitListModal";

function HabitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-bold">오늘의 습관 페이지 - 가승연</h1>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* 버튼 클릭 시 모달 열기 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          모달 열기
        </button>

        {/* 모달 컴포넌트 */}
        <HabitListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          showCloseIcon={true}
          showCloseButton={false}
        >
          <p>이 모달은 확인 버튼만 있습니다.</p>
        </HabitListModal>
      </div>
    </div>
  );
}

export default HabitPage;
