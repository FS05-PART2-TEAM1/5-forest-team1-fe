import React, { useState } from "react";
import PrimaryButton from "../common/buttons/PrimaryButton.jsx";
import selectBtn from "../assets/icons/ic_selected.png";
import btn_visible_on from "../assets/icons/btn_visibility_on.svg";
import btn_visible_off from "../assets/icons/btn_visibility_off.svg";
import bg1 from "../assets/mock_bg_images/bg_color_orange.jpg";
import bg2 from "../assets/mock_bg_images/bg_color_pink.jpg";
import bg3 from "../assets/mock_bg_images/bg_color_skyblue.jpg";
import bg4 from "../assets/mock_bg_images/bg_yellowpattern.jpg";
import bg5 from "../assets/mock_bg_images/bg_flight.jpg";
import bg6 from "../assets/mock_bg_images/bg_flower.jpg";
import bg7 from "../assets/mock_bg_images/bg_sea.jpg";
import bg8 from "../assets/mock_bg_images/bg_loveblue.jpg";
import StudyFormValidation from "@/components/StudyFormValidation.jsx";

const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

function StudyCreatePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSelected, setHasSelected] = useState(null);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleImageClick = (index) => {
    setHasSelected(index);
  };

  const validateNickname = (value) => {
    if (!value) return "*닉네임을 입력해주세요.";
    if (value.length < 3) return "닉네임은 3글자 이상이어야 합니다.";
    return null;
  };

  const validateStudyName = (value) => {
    if (!value) return "*스터디 이름을 입력해주세요.";
    return null;
  };

  const validatePassword = (value) => {
    if (!value) return "비밀번호를 입력해주세요.";
    if (value.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return null;
  };

  return (
    <div className="flex justify-center items-center bg-f-bg">
      <div className=" flex justify-center rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:h-[1171px] w-[344px] h-[1423px] mb-  bg-white  p-4">
        <div className="mt-1">
          <div>
            <div className=" md:w-[648px] ">
              <div className="mb-4">
                <h1 className="text-2xl font-bold">스터디 만들기</h1>
              </div>
              <form className="flex flex-col mb-4 gap-2">
                <StudyFormValidation
                  id="nickname"
                  label="닉네임"
                  className="border border-gray-300 p-3 h-12 rounded-xl"
                  placeholder="닉네임을 입력해 주세요"
                  validateFn={validateNickname}
                ></StudyFormValidation>
              </form>
              <form className="flex flex-col mb-4 gap-2">
                <StudyFormValidation
                  id="studyName"
                  label="스터디 이름"
                  className="border border-gray-300 p-3 h-12 rounded-xl"
                  placeholder="스터디 이름을 입력해주세요"
                  validateFn={validateStudyName}
                ></StudyFormValidation>
              </form>
              <form className="flex flex-col mb-6 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  소개
                </label>
                <textarea
                  className="border border-gray-300 p-3 h-24 rounded-xl  leading-7"
                  placeholder="소개 멘트를 작성해 주세요"
                />
              </form>
              <div className=" mb-4 ">
                <h3 className="text-lg font-semibold mb-3">
                  배경을 선택해주세요
                </h3>
                <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="w-[150px] h-[150px] rounded-2xl overflow-hidden relative cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {hasSelected === index && (
                        <img
                          src={selectBtn}
                          alt="Selected Icon"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <form className="flex flex-col mb-4 gap-2">
              {/* <label className="text-lg font-semibold" htmlFor="">
                비밀번호
              </label> */}
              <div className="relative">
                <StudyFormValidation
                  id="password"
                  type={isVisible ? "text" : "password"}
                  className="border border-gray-300 p-3 h-12 rounded-xl w-full"
                  label="비밀번호"
                  placeholder="비밀번호를 입력해 주세요"
                  validateFn={validatePassword}
                />
                <button
                  type="button"
                  onClick={handleClick}
                  className="absolute inset-y-0 right-3 flex items-center justify-center h-full"
                >
                  <img
                    src={isVisible ? btn_visible_on : btn_visible_off}
                    alt="Toggle visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </form>

            <form className="flex flex-col mb-[30px] md:mb-10 gap-2">
              {/* <label className="text-lg font-semibold" htmlFor="password">
                비밀번호 확인
              </label> */}
              <div className="relative">
                <StudyFormValidation
                  type={isVisible ? "text" : "password"}
                  className="border border-gray-300 p-3 h-12 rounded-xl w-full"
                  id="confirmPassword"
                  label="비밀번호 확인"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  validateFn={(value) => {
                    if (!value) return "*비밀번호가 일치하지 않습니다.";
                    // 비밀번호 확인 로직 추가 가능 ?
                    return null;
                  }}
                />
                <button
                  type="button"
                  onClick={handleClick}
                  className="absolute inset-y-0 right-3 flex items-center justify-center h-full"
                >
                  <img
                    src={isVisible ? btn_visible_on : btn_visible_off}
                    alt="Toggle visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </form>
          </div>
          <PrimaryButton>만들기</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
