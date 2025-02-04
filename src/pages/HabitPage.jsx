// PasswordPage.jsx
import React, { useState } from "react";
import PasswordModal from "../common/modal/PasswordModal";

function PasswordPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 입력값 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // 검증 로직 (예시: 비밀번호가 "secret"인 경우 성공)
  const handleVerify = (enteredPassword) => {
    if (enteredPassword === "secret") {
      alert("비밀번호 확인 완료!");
      closeModal();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">비밀번호 확인 페이지</h1>
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        모달 열기
      </button>

      {/* PasswordModal 컴포넌트 사용 */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onVerify={handleVerify}
        title="비밀번입력"
        password={password}
        onPasswordChange={handlePasswordChange}
        isPasswordVisible={isPasswordVisible}
        onTogglePasswordVisibility={togglePasswordVisibility}
      />
    </div>
  );
}

export default PasswordPage;
