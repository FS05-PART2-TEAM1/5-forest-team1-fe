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

  return (
    <div className="flex justify-center items-center bg-[#F6F4EF]">
      <div className=" flex justify-center rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:h-[1171px] w-[344px] h-[1423px]  bg-white  p-4">
        <div className="mt-2">
          <div>
            <div className=" md:w-[648px] ">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">스터디 수정하기</h1>
              </div>
              <form className="flex flex-col mb-6 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  닉네임
                </label>
                <input
                  className="border border-gray-300 p-3 h-12 rounded-xl"
                  placeholder="닉네임을 입력해 주세요"
                ></input>
              </form>
              <form className="flex flex-col mb-6 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  스터디 이름
                </label>
                <input
                  className="border border-gray-300 p-3 h-12 rounded-xl"
                  placeholder="스터디 이름을 입력해주세요"
                ></input>
              </form>
              <form className="flex flex-col mb-6 gap-4">
                <label className="text-lg font-semibold" htmlFor="">
                  소개
                </label>
                <textarea
                  className="border border-gray-300 p-3 h-24 rounded-xl  leading-7"
                  placeholder="소개 멘트를 작성해 주세요"
                />
              </form>
              <div className=" mb-6 ">
                <h3 className="text-lg font-semibold mb-6">
                  배경을 선택해주세요
                </h3>
                <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="w-[150px] h-[150px] rounded-xl overflow-hidden relative cursor-pointer"
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
            <form className="flex flex-col mb-6 gap-2">
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

            <form className="flex flex-col mb-[30px] md:mb-10 gap-2">
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
          <PrimaryButton>수정 완료</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
