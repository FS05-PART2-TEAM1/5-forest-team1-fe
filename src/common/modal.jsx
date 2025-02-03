import React from "react";

const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
  if (!isOpen) return null; // 모달이 닫혀있다면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[500px] font-sans">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#578246] font-bold text-xl"
          >
            나가기
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="mb-6 text-lg">{children}</div>

        {/* 모달 버튼 */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            style={{ fontFamily: "EF_jejudoldam, sans-serif" }}
            className="px-5 py-3 bg-gray-300 rounded-full hover:bg-gray-400 text-lg"
          >
            닫기
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-5 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-lg"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
