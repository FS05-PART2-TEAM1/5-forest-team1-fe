import React, { useEffect, useState } from "react";
import hideIcon from "./img/hideEyes.png";
import openIcon from "./img/openEyes.png";
import ModalButton from "../buttons/ModalButton";
import { deleteStudy, verifyPassword } from "@/api/studyApi";
import ErrorMessage from "../MessageBox";
import { useNavigate } from "react-router-dom";

const PasswordModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  studyId,
  studyData,
}) => {
  if (!isOpen) return null;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState(``);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleInputKey(e) {
    if(e.key === 'Enter') await onVerify();
  }

  useEffect(() => {
    if (buttonText === "수정하러 가기") setLink(`/modify/`);
    if (buttonText === "스터디 삭제하기") setLink(`/`);
    if (buttonText === "오늘의 습관으로 가기") setLink(`/habit/`);
    if (buttonText === "오늘의 집중으로 가기") setLink(`/focus/`);
  }, []);

  // 토글 기능
  const onTogglePasswordVisibility = () => {
    if (isPasswordVisible) setIsPasswordVisible(false);
    else setIsPasswordVisible(true);
  };

  // 패스워드 검증 기능
  const onVerify = async () => {
    try{
      const verifyData = await verifyPassword(studyId, password);
      console.log(verifyData);
      if (verifyData.message) {
        //검증 완료 시
        setMessage("");
        if (buttonText !== "스터디 삭제하기") {
          navigate(link, { state: { studyData, password } });
          /*
            이동한 페이지에서 사용할 때
            const location = useLocation();
            console.log(location.state);
          */
        }
        else{
          deleteStudy(studyId);
          navigate(link);
        }
      }
    } catch (err) {

      //검증 실패 시
      setMessage("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
    }

    
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white rounded-[20px] shadow-xl p-6 w-full max-w-[648px] h-[369px] font-sans relative flex flex-col mx-[19px]">
          <div className="flex items-center justify-center relative mb-6">
            <h2 className="text-[24px] max-[743px]:text-[18px] font-extrabold text-center flex-1">
              {title || "비밀번호 확인"}
            </h2>
            <div className="hidden min-[744px]:block absolute right-0  mt-4 text-[#578246] hover:text-green-700 ">
              <button onClick={onClose} isCancel>
                나가기
              </button>
            </div>
          </div>

          <p className="text-[18px] font-medium text-[#818181] text-center mb-6">
            권한이 필요해요!
          </p>

          <label className="text-[18px] font-medium text-black block mb-2">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="w-full p-3 border rounded-lg pr-12"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={onPasswordChange}
              onKeyDown={handleInputKey}
            />
            <button
              type="button"
              onClick={onTogglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <img
                src={isPasswordVisible ? openIcon : hideIcon}
                alt={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보이기"}
                className="w-6 h-6"
              />
            </button>
          </div>

          <div className="flex flex-col-reverse max-[743px]:flex-col-reverse gap-4 mt-[30px]">
            <div className="hidden max-[743px]:block mt-4 text-[#578246] hover:text-green-700 text-[16px] font-weight-500 mx-auto">
              <button onClick={onClose} isCancel className="w-full">
                나가기
              </button>
            </div>

            <ModalButton onClick={() => onVerify(password)} className="w-full">
              {buttonText || 확인}
            </ModalButton>
          </div>
        </div>
        <div className="absolute bottom-10">
          {message && <ErrorMessage message={message} isCompleted={false} />}
        </div>
      </div>
    </>
  );
};

export default PasswordModal;
