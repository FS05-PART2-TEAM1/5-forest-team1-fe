import React, { useState, useEffect } from "react";
import { createStudy } from "@/api/studyApi";
import PrimaryButton from "../common/buttons/PrimaryButton.jsx";
import selectBtn from "../assets/icons/ic_selected.png";
import StudyFormValidation from "@/components/StudyFormValidation.jsx";
import PasswordValidation from "@/components/PasswordValidation.jsx";
import { Header } from "@/common/layout/Header.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { patchStudy } from "@/api/studyApi";

const colorMap = {
  "#EED3D9": "pink",
  "#F5E8DD": "yellow",
  "#CCD3CA": "green",
  "#B5C0D0": "blue",
};

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

function StudyModifyPage() {
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

  const location = useLocation();
  const { studyData } = location.state || {};

  console.log(studyData);
  useEffect(() => {
    if (studyData) {
      setNickname(studyData.nickname || "");
      setStudyName(studyData.title || "");
      setStudyDesc(studyData.description || "");
      setPassword(studyData.password || "");
      setConfirmPassword(studyData.password || "");

      // 선택된 배경 이미지가 있다면 상태 설정
      const selectedBackgroundIndex = backgrounds.findIndex(
        (background) =>
          background.content === studyData.backgroundContent ||
          (background.type === "color" &&
            background.content.toLowerCase() ===
              studyData.backgroundContent.toLowerCase())
      );

      setHasSelected(
        selectedBackgroundIndex >= 0 ? selectedBackgroundIndex : null
      );
    }
  }, [studyData]);

  const handleValidation = (field, error) => {
    setErrors((prev) => ({ ...prev, [field]: !!error }));
  };

  const handleSubmit = async () => {
    // 비밀번호 일치 여부 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 배경 이미지 선택 여부 체크
    if (hasSelected === null) {
      alert("배경을 선택해주세요.");
      return;
    }
    const isFormValid =
      Object.values(errors).every((error) => !error) && hasSelected !== null;
    if (!isFormValid) {
      alert("모든 입력란을 올바르게 채워주세요.");
      return;
    }

    const background = backgrounds[hasSelected];
    let backgroundContent = background.content;

    // hex 코드를 문자열로 변환
    if (background.type === "color") {
      backgroundContent = colorMap[backgroundContent] || backgroundContent;
    }
    try {
      const response = await createStudy({
        nickname,
        title: studyName,
        description: studyDesc,
        backgroundType: background.type,
        backgroundContent,
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
      <Header />
      <div className="flex justify-center items-center">
        <div className=" flex justify-center rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:min-h-[1171px] w-[344px] min-h-[1423px] bg-white  p-4">
          <div className="mt-1">
            <div>
              <div className=" md:w-[648px] ">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">스터디 수정하기</h1>
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label htmlFor="nickname">닉네임</label>
                  <input
                    id="nickname"
                    placeholder="닉네임을 입력해 주세요"
                    value={nickname} // value는 상태값을 직접 전달
                    onChange={(e) => {
                      setNickname(e.target.value);
                      handleValidation(
                        "nickname",
                        e.target.value.length < 2 || e.target.value.length > 10
                          ? "닉네임은 2~10자여야 합니다."
                          : null
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <label htmlFor="studyName">스터디 이름</label>
                  <input
                    id="studyName"
                    placeholder="스터디 이름을 입력해주세요"
                    value={studyName} // value는 상태값을 직접 전달
                    onChange={(e) => {
                      setStudyName(e.target.value);
                      handleValidation(
                        "studyName",
                        e.target.value.length < 3 || e.target.value.length > 10
                          ? "스터디 이름은 3~10자여야 합니다."
                          : null
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col mb-6 gap-2">
                  <label htmlFor="studyDesc">소개</label>
                  <textarea
                    id="studyDesc"
                    placeholder="스터디에 대한 소개를 10자 이상 300자 이하로 입력해주세요."
                    value={studyDesc} // value는 상태값을 직접 전달
                    onChange={(e) => {
                      setStudyDesc(e.target.value);
                      handleValidation(
                        "studyDesc",
                        e.target.value.length < 10 ||
                          e.target.value.length > 300
                          ? "소개는 10~300자여야 합니다."
                          : null
                      );
                    }}
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
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleValidation(
                      "password",
                      e.target.value.length < 6
                        ? "비밀번호는 6자 이상이어야 합니다."
                        : null
                    );
                  }}
                />
              </div>

              <div className="flex flex-col mb-5 md:mb-6 gap-2">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handleValidation(
                      "confirmPassword",
                      e.target.value !== password
                        ? "비밀번호가 일치하지 않습니다."
                        : null
                    );
                  }}
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
              수정 완료
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyModifyPage;
