import React, { useState } from "react";
import Modal from "../common/Modal";

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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="공통 모달"
          onConfirm={() => {
            setIsModalOpen(false);
          }}
        >
          <p>이것은 공통 모달입니다. 필요한 내용을 여기에 입력하세요.</p>
        </Modal>
      </div>
    </div>
  );
}

export default HabitPage;
