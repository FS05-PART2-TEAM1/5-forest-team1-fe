import React, { useState } from "react";
import PasswordModal from "../common/modal/PasswordModal"; // 모달 컴포넌트 import
import ModalButton from "../common/buttons/ModalButton"; // 버튼 import

const HabitPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 모달 열기
  const openModal = () => setIsModalOpen(true);
  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setPassword(""); // 비밀번호 초기화
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 보이기/숨기기 토글
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // 비밀번호 검증 (예제)
  const handleVerifyPassword = (inputPassword) => {
    if (inputPassword === "1234") {
      alert("비밀번호가 확인되었습니다! ✅");
      closeModal();
    } else {
      alert("비밀번호가 틀렸습니다! ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">오늘의 습관 페이지 - 가승연</h1>

      {/* 모달 열기 버튼 */}
      <ModalButton onClick={openModal}>모달 테스트</ModalButton>

      {/* PasswordModal 컴포넌트 */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onVerify={handleVerifyPassword}
        title="비밀번호 입력"
        password={password}
        onPasswordChange={handlePasswordChange}
        isPasswordVisible={isPasswordVisible}
        onTogglePasswordVisibility={togglePasswordVisibility}
      />
    </div>
  );
};

export default HabitPage;
