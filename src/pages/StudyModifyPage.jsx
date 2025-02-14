import React, { useState, useEffect } from "react";
import PrimaryButton from "../common/buttons/PrimaryButton.jsx";
import colorChoice from "../assets/icons/ic_selected.png";
import imageChoice from "../assets/icons/paw_delete.png";
import StudyFormValidation from "@/components/StudyFormValidation.jsx";
import PasswordValidation from "@/components/PasswordValidation.jsx";
import { Header } from "@/common/layout/Header.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { patchStudy } from "@/api/studyApi";
import { uploadImage } from "@/api/uploadImage.js";
import ErrorMessage from "@/common/MessageBox2.jsx";

const colorMap = {
  "#FDE0E9": "pink",
  "#FFF1CC": "yellow",
  "#E1EDDE": "green",
  "#E0F1F5": "blue",
};

function StudyModifyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSelected, setHasSelected] = useState(null);
  const [backgrounds, setBackgrounds] = useState([
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
  ]);
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

      // studyData의 배경 정보와 backgrounds 배열을 비교하여 선택된 배경 찾기
      const selectedIndex = backgrounds.findIndex(
        (bg) =>
          bg.type === studyData.backgroundType &&
          (bg.type === "color"
            ? colorMap[bg.content] === studyData.backgroundContent
            : bg.content === studyData.backgroundContent)
      );

      setHasSelected(selectedIndex !== -1 ? selectedIndex : -1); // 배경이 없다면 -1
    }
  }, [studyData, backgrounds]);

  // const [nickname, setNickname] = useState("");
  // const [studyName, setStudyName] = useState("");
  // const [studyDesc, setStudyDesc] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [errors, setErrors] = useState({
  //   nickname: false,
  //   studyName: false,
  //   studyDesc: false,
  //   password: false,
  //   confirmPassword: false,
  // });

  const navigate = useNavigate();

  const handleImageClick = (index) => {
    // 사용자가 배경 이미지를 클릭하면 해당 이미지의 index를 hasSelected에 저장
    setHasSelected(index);
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; //사용자가 파일을 업로드하면 첫 번째 파일을 가져옴.

    if (backgrounds.length >= 11) {
      setErrorMessage("사진 이미지는 3장까지만 추가 가능합니다.");
      console.log("사진 이미지는 3장까지만 추가 가능합니다.");
      return; // 이미지 업로드를 더 이상 진행하지 않음
    }

    if (file) {
      const uploadedUrl = await uploadImage(file); //uploadImage(file) 함수(외부 API)를 사용하여 이미지를 업로드
      // 새로운 이미지 backgrounds 배열에 추가
      setBackgrounds((prev) => [
        ...prev,
        { type: "image", content: uploadedUrl, isUploaded: true }, // isUploaded 필드로 새로 업로드된 이미지 구분
      ]);

      // 업로드된 이미지를 선택하려면 사용자가 클릭해야 하므로
      // 업로드 후 'hasSelected' 상태를 null로 초기화 (이미지 선택을 기다리는 상태로)
      setHasSelected(null);
    }
  };

  // 이미지 삭제 버튼 클릭 시 호출
  const handleDeleteImage = (index) => {
    // 해당 인덱스의 이미지를 backgrounds 배열에서 제거
    setBackgrounds((prev) => prev.filter((_, i) => i !== index));
  };

  // // 특정 입력 field의 오류 여부를 errors 상태에 업데이트. !!error → true/false 값으로 변환해 저장
  // const handleValidation = (field, error) => {
  //   setErrors((prev) => ({ ...prev, [field]: !!error }));
  // };

  const handleValidation = (field, error) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev, [field]: !!error };
      return updatedErrors;
    });
  };
  const handleSubmit = async () => {
    if (isSubmitting) return; // isSubmitting이 true라면 함수 실행을 막아 중복 요청 방지

    setIsSubmitting(true); // 요청 시작 시 버튼 비활성화
    setErrorMessage(""); // 이전 오류 메시지 초기화

    // 비밀번호 일치 여부 체크
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      setIsSubmitting(false);
      return;
    }
    // 배경 이미지 선택 여부 체크 -  hasSelected에 업로드된 이미지 인덱스가 없으면,
    if (hasSelected === null) {
      setErrorMessage("배경을 선택해주세요.");
      setIsSubmitting(false);
      return;
    }

    //errors 객체의 모든 값이 false(즉, 에러 없음)이고, 배경이 선택되었는지
    const isFormValid =
      Object.values(errors).every((error) => !error) && hasSelected !== null;

    if (!isFormValid) {
      setErrorMessage("모든 입력란을 올바르게 채워주세요.");
      setIsSubmitting(false);
      return;
    }

    const isFormValidNow = !Object.values(errors).includes(true);

    const background = backgrounds[hasSelected];
    let backgroundType, backgroundContent;
    if (hasSelected !== null) {
      backgroundType = background.type;
      backgroundContent =
        background.type === "color"
          ? colorMap[background.content] // ✅ 색상이면 이름으로 변환
          : background.content;
    } else {
      setErrorMessage("배경을 선택하거나 업로드해 주세요.");
      setIsSubmitting(false); //? 버튼을 다시 활성화한 후, return으로 실행을 멈춰
      return;
    }

    try {
      const response = await patchStudy(studyData.id, {
        nickname,
        title: studyName,
        description: studyDesc,
        backgroundType,
        backgroundContent,
        password,
        passwordConfirm: confirmPassword,
      });
      console.log(response);
      // 스터디 수정 후 StudyDetailPage로 라우팅
      navigate(`/study/${response.id}`); // response.id =생성된 스터디 ID
    } catch (error) {
      console.error(
        "스터디 수정 실패:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("스터디 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false); // 요청 완료 후 다시 버튼 활성화
    }
  };

  return (
    <div className="w-full min-h-screen bg-f-bg flex flex-col">
      <Header />
      <div className="flex justify-center min-h-screen py-16 md:py-10">
        <div className="bg-white flex flex-wrap justify-center rounded-[20px] w-fit max-w-[696px] min-w-[344px] mx-10 lg:pb-8 lg:pt-8 md:p-6 p-4">
          <div className="mt-1">
            <div>
              <div className=" md:w-[648px] ">
                <div className="mb-4">
                  <h1 className="text-2xl font-bold">스터디 수정하기</h1>
                </div>
                <div className="flex flex-col mb-4 gap-2">
                  <StudyFormValidation
                    id="nickname"
                    label="닉네임"
                    placeholder="닉네임을 입력해 주세요"
                    value={nickname} // 상태값을 직접 전달
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
                    value={studyName}
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
                    value={studyDesc}
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
                        {/* 이미지 타입일 경우 */}
                        {background.type === "image" && (
                          <img
                            src={background.content}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* 선택된 항목에 대해 아이콘 표시 */}
                        {hasSelected === index && (
                          <img
                            src={
                              background.type === "color"
                                ? colorChoice
                                : imageChoice
                            }
                            alt="Selected Icon"
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
                          />
                        )}
                        {/* 9번째 인덱스부터 삭제 버튼 표시 */}
                        {index >= 8 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // 클릭 이벤트 버블링 방지
                              handleDeleteImage(index); // 해당 이미지 인덱스를 전달하여 삭제
                            }}
                            className="absolute top-[1.5px] right-[2px] px-1 rounded-full bg-white bg-opacity-30 text-white z-30"
                          >
                            ✖
                          </button>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-col items-center gap-4 mx-auto">
                      {/* 파일 업로드 카드 */}
                      <label className="w-[150px] h-[150px] rounded-2xl flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-[#578246] cursor-pointer hover:bg-gray-200 transition">
                        <span className="text-[#578246] text-xl">📁</span>
                        <span className="text-gray-600">이미지 업로드</span>

                        <input
                          type="file"
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-4 gap-2">
                <PasswordValidation
                  id="password"
                  label="비밀번호"
                  value={password}
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

              <form className="flex flex-col mb-5 md:mb-6 gap-2">
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
              </form>
            </div>
            <PrimaryButton onClick={handleSubmit}>
              {isSubmitting ? "로딩 중..." : "수정 완료"}
            </PrimaryButton>
          </div>
        </div>
      </div>{" "}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
    </div>
  );
}

export default StudyModifyPage;
