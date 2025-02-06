import React, { useState } from "react";
import PrimaryButton from "../common/buttons/PrimaryButton.jsx";
import selectBtn from "../assets/icons/ic_selected.png";
import btn_visible_on from "../assets/icons/btn_visibility_on.svg";
import btn_visible_off from "../assets/icons/btn_visibility_off.svg";
import StudyFormValidation from "@/components/StudyFormValidation.jsx";
import { Header } from "@/common/layout/Header.jsx";

//TO DO: 수정페이지 작업, 컴포넌트 분리,
//       비밀번호 visible 토글 버튼 에러메시지 출력시 위치 변경되는것 해결,
//       POST API 작업
//       소개 입력 textarea 검증?

const backgrounds = [
  { type: "color", content: "#EED3D9" },
  { type: "color", content: "#F5E8DD" },
  { type: "color", content: "#CCD3CA" },
  { type: "color", content: "#B5C0D0" },
  {
    type: "image",
    content:
      "https://fastly.picsum.photos/id/550/200/200.jpg?hmac=1cWp9LPVpvHr7sCXaCMeMnsIHNCLfqPwnIkIA0GUzcM",
  },
  {
    type: "image",
    content:
      "https://fastly.picsum.photos/id/431/200/200.jpg?hmac=htJbypAbF5_h67SAU-qYOJLyDwNNHcHSfL67TITi2hc",
  },
  {
    type: "image",
    content:
      "https://fastly.picsum.photos/id/802/200/200.jpg?hmac=alfo3M8Ps4XWmFJGIwuzLUqOrwxqkE5_f65vCtk6_Iw",
  },
  {
    type: "image",
    content:
      "https://fastly.picsum.photos/id/657/200/200.jpg?hmac=6vrgINA0qije4LsZMVl1Rea_OtagocnfsCfETPr0_Hc",
  },
];
function StudyCreatePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if ((value.length < 3) | (value.length > 10))
      return "스터디 이름은 3글자 이상 10글자 이하로 설정해주세요.";
    return null;
  };
  const validatePassword = (value) => {
    if (!value) return "비밀번호를 입력해주세요.";
    if (value.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    return null;
  };
  const validateConfirmPassword = (value, password) => {
    if (!value) return "*비밀번호를 다시 입력해주세요.";
    if (value !== password) return "*비밀번호가 일치하지 않습니다.";
    return null;
  };
  return (
    <>
      <Header isCreateButton={true} />
      <div className="flex justify-center items-center bg-f-bg">
        <div className=" flex justify-center rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:min-h-[1171px] w-[344px] min-h-[1423px] bg-white  p-4">
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
                    placeholder="닉네임을 입력해 주세요"
                    validateFn={validateNickname}
                  ></StudyFormValidation>
                </form>
                <form className="flex flex-col mb-4 gap-2">
                  <StudyFormValidation
                    id="studyName"
                    label="스터디 이름"
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
                    {backgrounds.map((background, index) => (
                      <div
                        key={index}
                        className={`w-[150px] h-[150px] rounded-2xl overflow-hidden relative cursor-pointer ${
                          background.type === "color" ? "border" : ""
                        }`}
                        style={{
                          backgroundColor:
                            background.type === "color"
                              ? background.content
                              : undefined,
                        }}
                        onClick={() => handleImageClick(index)}
                      >
                        {background.type === "image" && (
                          <img
                            src={background.content}
                            // alt={`Background ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
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
                    label="비밀번호"
                    placeholder="비밀번호를 입력해 주세요"
                    validateFn={validatePassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <img
                    src={isVisible ? btn_visible_on : btn_visible_off}
                    alt="Toggle visibility"
                    type="button"
                    onClick={handleClick}
                    className="w-5 absolute inset-y-0 top-4 right-3 flex items-center justify-center h-full z-10"
                  />
                </div>
              </form>

              <div className="flex flex-col mb-5 md:mb-6 gap-2">
                <div className="relative">
                  <StudyFormValidation
                    type={isVisible ? "text" : "password"}
                    id="confirmPassword"
                    label="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해 주세요"
                    validateFn={(value) =>
                      validateConfirmPassword(value, password)
                    }
                  />

                  <img
                    src={isVisible ? btn_visible_on : btn_visible_off}
                    alt="Toggle visibility"
                    type="button"
                    onClick={handleClick}
                    className=" w-5 absolute inset-y-0 top-4 right-3 flex items-center justify-center h-full z-10"
                  />
                </div>
              </div>
            </div>
            <PrimaryButton>만들기</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyCreatePage;
