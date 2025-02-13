import React, { useState, useEffect } from "react";
import { createStudy } from "@/api/studyApi";
import PrimaryButton from "../common/buttons/PrimaryButton.jsx";
import selectBtn from "../assets/icons/ic_selected.png";
import StudyFormValidation from "@/components/StudyFormValidation.jsx";
import PasswordValidation from "@/components/PasswordValidation.jsx";
import { Header } from "@/common/layout/Header.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { patchStudy } from "@/api/studyApi";

//TO DO: 입력란 유효성 검증 후 PATCH API 전송

const colorMap = {
  "#FDE0E9": "pink",
  "#FFF1CC": "yellow",
  "#E1EDDE": "green",
  "#E0F1F5": "blue",
};

const backgrounds = [
  { type: "color", content: "#FDE0E9" },
  { type: "color", content: "#FFF1CC" },
  { type: "color", content: "#E1EDDE" },
  { type: "color", content: "#E0F1F5" },
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

function StudyModifyPage() {
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [studyDesc, setStudyDesc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSelected, setHasSelected] = useState(null);
  const [errors, setErrors] = useState({
    nickname: false,
    studyName: false,
    studyDesc: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { studyData } = location.state || {};

  useEffect(() => {
    console.log(studyData);
    if (studyData) {
      setNickname(studyData.nickname || "");
      setStudyName(studyData.title || "");
      setStudyDesc(studyData.description || "");
      setPassword(studyData.password || "");
      setConfirmPassword(studyData.password || "");

      const selectedBackgroundIndex = backgrounds.findIndex((background) => {
        if (background.type === "color") {
          return colorMap[background.content] === studyData.backgroundContent;
        }
        return (
          background.type === studyData.backgroundType &&
          background.content.toLowerCase() ===
            studyData.backgroundContent.toLowerCase()
        );
      });

      setHasSelected(
        selectedBackgroundIndex >= 0 ? selectedBackgroundIndex : null
      );
    }
  }, [studyData]);

  const handleImageClick = (index) => {
    setHasSelected(index);
  };
  const handleValidation = (field, error) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev, [field]: !!error };
      return updatedErrors;
    });
  };

  const isFormValidNow = !Object.values(errors).includes(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(isFormValidNow);
  }, [errors]);
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (hasSelected === null) {
      alert("배경을 선택해주세요.");
      return;
    }

    if (!isFormValid) {
      alert("모든 입력란을 올바르게 채워주세요.");
      return;
    }

    const background = backgrounds[hasSelected];
    let backgroundContent = background.content;

    if (background.type === "color") {
      backgroundContent = colorMap[backgroundContent] || backgroundContent;
    }
    try {
      const response = await patchStudy(studyData.id, {
        nickname,
        title: studyName,
        description: studyDesc,
        backgroundType: background.type,
        backgroundContent,
        password,
        passwordConfirm: confirmPassword,
      });
      console.log(response);
      // 스터디 수정 후 StudyDetailPage로 라우팅
      navigate(`/study/${response.study.id}`); // response.id =생성된 스터디 ID
    } catch (error) {
      console.error(
        "스터디 수정 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-f-bg">
      <Header />
      <div className="flex justify-center min-h-screen py-20 md:py-10">
        <div className=" flex justify-center rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[696px]  mb-20 lg:w-[696px] md:w-[696px] w-[344px] bg-white mx-auto">
          <div className="mt-1">
            <div>
              <div className=" md:w-[648px] ">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">스터디 수정하기</h1>
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label htmlFor="nickname">닉네임</label>
                  <StudyFormValidation
                    id="nickname"
                    placeholder="닉네임을 입력해 주세요"
                    value={nickname} // 상태값을 직접 전달
                    onChange={(e) => setNickname(e.target.value)} // 상태만 변경
                    validateFn={(value) =>
                      value.trim().length < 2
                        ? "닉네임은 2자 이상이어야 합니다."
                        : null
                    }
                    onValidate={(error) => handleValidation("nickname", error)} // 부모 상태 업데이트
                  />
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label htmlFor="studyName">스터디 이름</label>
                  <StudyFormValidation
                    id="studyName"
                    placeholder="스터디 이름을 입력해주세요"
                    value={studyName} // value는 상태값을 직접 전달
                    onChange={(e) => setStudyName(e.target.value)}
                    validateFn={(value) =>
                      value.length < 3 || value.length > 10
                        ? "스터디 이름은 3~10자여야 합니다."
                        : null
                    }
                    onValidate={(error) => handleValidation("studyName", error)}
                  />
                </div>
                <div className="flex flex-col mb-6 gap-2">
                  <label htmlFor="studyDesc">소개</label>
                  <StudyFormValidation
                    id="studyDesc"
                    placeholder="스터디에 대한 소개를 10자 이상 300자 이하로 입력해주세요."
                    value={studyDesc}
                    isTextarea
                    onChange={(e) => setStudyDesc(e.target.value)}
                    validateFn={(value) =>
                      value.length < 10 || value.length > 300
                        ? "소개는 10~300자여야 합니다."
                        : null
                    }
                    onValidate={(error) => handleValidation("studyDesc", error)}
                  />
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-3">
                    배경을 선택해주세요
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
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
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* 선택된 배경에 표시될 아이콘 */}
                        {(hasSelected === index ||
                          (studyData &&
                            studyData.backgroundContent &&
                            backgrounds[index].content ===
                              studyData.backgroundContent)) && (
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
              <div className="flex flex-col mb-4 gap-2">
                <PasswordValidation
                  id="password"
                  type="password"
                  label="비밀번호"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validateFn={(value) =>
                    value.length < 6
                      ? "비밀번호는 6자 이상이어야 합니다."
                      : null
                  }
                />
              </div>

              <div className="flex flex-col mb-5 md:mb-6 gap-2">
                <PasswordValidation
                  id="confirmPassword"
                  type="password"
                  label="비밀번호 확인"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  validateFn={(value) =>
                    value !== password ? "비밀번호가 일치하지 않습니다." : null
                  }
                />
              </div>
            </div>
            <PrimaryButton
              onClick={handleSubmit}
              disabled={isFormValid === false}
            >
              수정 완료
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyModifyPage;
