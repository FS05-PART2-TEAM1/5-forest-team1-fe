import React, { useState } from "react";
import btn_visible_on from "../assets/icons/btn_visibility_on.svg";
import btn_visible_off from "../assets/icons/btn_visibility_off.svg";
function StudyCreatePage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="flex justify-center items-center bg-[#F6F4EF]">
      <div className=" rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:h-[1171px] w-[344px] h-[1423px]  bg-white  p-4">
        <div className="mt-2">
          <div>
            <div className="gap-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">스터디 만들기</h1>
              </div>
              <form className="flex flex-col mb-4 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  닉네임
                </label>
                <input
                  className="border border-gray-300 p-3 h-12 rounded-xl"
                  placeholder="닉네임을 입력해 주세요"
                ></input>
              </form>
              <form className="flex flex-col mb-4 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  스터디 이름
                </label>
                <input
                  className="border border-gray-300 p-3 h-12 rounded-xl"
                  placeholder="스터디 이름을 입력해주세요"
                ></input>
              </form>
              <form className="flex flex-col mb-4 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  소개
                </label>
                <textarea
                  className="border border-gray-300 p-3 h-24 rounded-xl  leading-7"
                  placeholder="소개 멘트를 작성해 주세요"
                />
              </form>
              <div className=" mb-4 gap-2">
                <h3 className="text-lg font-semibold">배경을 선택해주세요</h3>
                <div>이미지들 </div>
              </div>
            </div>
            <form className="flex flex-col mb-4 gap-2">
              <label className="text-lg font-semibold" htmlFor="">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isVisible ? "text" : "password"}
                  className="border border-gray-300 p-3 h-12 rounded-xl w-full"
                  placeholder="비밀번호를 입력해 주세요"
                />
                <button
                  type="button"
                  onClick={handleClick}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <img
                    src={isVisible ? btn_visible_on : btn_visible_off}
                    alt="Toggle visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </form>

            <form className="flex flex-col mb-4 gap-2">
              <label className="text-lg font-semibold" htmlFor="password">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isVisible ? "text" : "password"}
                  className="border border-gray-300 p-3 h-12 rounded-xl w-full"
                  placeholder="비밀번호를 다시 입력해 주세요"
                />
                <button
                  type="button"
                  onClick={handleClick}
                  className="absolute inset-y-0 right-3 flex items-center"
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
          <button>만들기</button>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
