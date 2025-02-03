import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseIcon = true, // X 버튼 (우측 상단 닫기)
  showCloseButton = true, // 닫기 버튼
  showConfirmButton = true, // 확인 버튼
  onConfirm,
  className = "",
}) => {
  if (!isOpen) return null; // 모달이 닫혀있다면 렌더링하지 않음

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 ${className}`}
    >
      <div className="bg-white rounded-[20px] shadow-xl p-8 w-[500px] font-sans relative">
        {/* 헤더 (title이 있을 때만 렌더링) */}
        {title && (
          <div className="flex items-center justify-center relative mb-6">
            <h2 className="text-2xl font-extrabold flex-1 text-center">
              {title}
            </h2>
            {onClose && showCloseIcon && (
              <button
                onClick={onClose}
                className="absolute right-0 text-red-500 hover:text-red-700 font-bold text-xl"
              >
                ✖
              </button>
            )}
          </div>
        )}

        {/* 모달 본문 */}
        <div className="text-lg">{children}</div>

        {/* 버튼 영역 (필요할 때만 렌더링) */}
        <div className="flex justify-center space-x-4 mt-6">
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="px-5 py-3 bg-gray-300 rounded-full hover:bg-gray-400 text-lg"
            >
              닫기
            </button>
          )}
          {showConfirmButton && (
            <button
              onClick={onConfirm || onClose}
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
