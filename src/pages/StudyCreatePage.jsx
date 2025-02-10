import React, { useState } from "react";
import { createStudy } from "@/api/studyApi";
import PrimaryButton from "../common/buttons/PrimaryButton.jsx";
import selectBtn from "../assets/icons/ic_selected.png";
import StudyFormValidation from "@/components/StudyFormValidation.jsx";
import PasswordValidation from "@/components/PasswordValidation.jsx";
import { Header } from "@/common/layout/Header.jsx";
import { useNavigate } from "react-router-dom";

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
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [studyDesc, setStudyDesc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSelected, setHasSelected] = useState(null);
  const [errors, setErrors] = useState({
    nickname: true,
    studyName: true,
    studyDesc: true,
    password: true,
    confirmPassword: true,
  });
  const navigate = useNavigate();

  const handleImageClick = (index) => {
    setHasSelected(index);
  };

  const handleValidation = (field, error) => {
    setErrors((prev) => ({ ...prev, [field]: !!error }));
  };

  const handleSubmit = async () => {
    // 비밀번호 일치 여부 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const isFormValid =
      Object.values(errors).every((error) => !error) && hasSelected !== null;
    if (!isFormValid) {
      alert("모든 입력란을 올바르게 채워주세요.");
      return;
    }

    const background = backgrounds[hasSelected];

    try {
      const response = await createStudy({
        nickname,
        title: studyName,
        description: studyDesc,
        backgroundType: background.type,
        backgroundContent: background.content,
        password,
        passwordConfirm: confirmPassword,
      });

      // 스터디 생성 후 StudyDetailPage로 라우팅
      navigate(`/study/${response.id}`); // response.id =생성된 스터디 ID
    } catch (error) {
      console.error(
        "스터디 생성 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-f-bg">
      <Header isCreateButton={true} />
      <div className="flex justify-center items-center">
        <div className=" flex justify-center rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:min-h-[1171px] w-[344px] min-h-[1423px] bg-white  p-4">
          <div className="mt-1">
            <div>
              <div className=" md:w-[648px] ">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">스터디 만들기</h1>
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <StudyFormValidation
                    id="nickname"
                    label="닉네임"
                    placeholder="닉네임을 입력해 주세요"
                    validateFn={(value) =>
                      value.length >= 2 && value.length <= 10
                        ? null
                        : "닉네임은 2~10자여야 합니다."
                    }
                    onChange={(e) => setNickname(e.target.value)}
                    onValidate={(error) => handleValidation("nickname", error)}
                  />
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <StudyFormValidation
                    id="studyName"
                    label="스터디 이름"
                    placeholder="스터디 이름을 입력해주세요"
                    validateFn={(value) =>
                      value.length >= 3 && value.length <= 10
                        ? null
                        : "스터디 이름은 3~10자여야 합니다."
                    }
                    onChange={(e) => setStudyName(e.target.value)}
                    onValidate={(error) => handleValidation("studyName", error)}
                  />
                </div>
                <div className="flex flex-col mb-6 gap-2">
                  <StudyFormValidation
                    label="소개"
                    placeholder="스터디에 대한 소개를 10자 이상 300자 이하로 입력해주세요."
                    validateFn={(value) =>
                      value.length >= 10 && value.length <= 300
                        ? null
                        : "소개는 10~300자여야 합니다."
                    }
                    onChange={(e) => setStudyDesc(e.target.value)}
                    onValidate={(error) => handleValidation("studyDesc", error)}
                    isTextarea
                  />
                </div>
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
              <div className="flex flex-col mb-4 gap-2">
                <PasswordValidation
                  id="password"
                  label="비밀번호"
                  placeholder="비밀번호를 입력해 주세요"
                  validateFn={(value) =>
                    value.length >= 6
                      ? null
                      : "비밀번호는 6자 이상이어야 합니다."
                  }
                  onChange={(e) => setPassword(e.target.value)}
                  onValidate={(error) => handleValidation("password", error)}
                />
              </div>

              <div className="flex flex-col mb-5 md:mb-6 gap-2">
                <PasswordValidation
                  id="confirmPassword"
                  label="비밀번호 확인"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  validateFn={(value) =>
                    value === password ? null : "비밀번호가 일치하지 않습니다."
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onValidate={(error) =>
                    handleValidation("confirmPassword", error)
                  }
                />
              </div>
            </div>
            <PrimaryButton
              onClick={handleSubmit}
              disabled={
                Object.values(errors).some((error) => error) ||
                hasSelected === null
              }
            >
              만들기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
