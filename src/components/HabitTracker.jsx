import React from "react";
import paw from "../assets/icons/ic_paw.png";
function HabitTracker() {
  return (
    <div className="flex justify-center items-center bg-blue-950 bg-opacity-80">
      <div className=" rounded-xl border lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[1120px] lg:h-[511px] md:w-[648px] md:h-[511px] w-[312px] h-[450px]  bg-white  p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">습관 기록표</h1>
        </div>

        <section className="flex flex-col gap-4 p-4">
          <div class="flex gap-4 pl-44">
            <div class="w-8 text-center">월</div>
            <div class="w-8 text-center">화</div>
            <div class="w-8 text-center">수</div>
            <div class="w-8 text-center">목</div>
            <div class="w-8 text-center">금</div>
            <div class="w-8 text-center">토</div>
            <div class="w-8 text-center">일</div>
          </div>
          <div className="font-semibold text-[14px] md:text-[18px]">
            <div className="flex items-center gap-4 ">
              <div className="w-[160px] px-6 whitespace-pre-wrap md:whitespace-normal ">
                <span className="block">미라클모닝 6시</span>
                <span className="block text-right">기상</span>
              </div>
              <div className="flex gap-6">
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[160px] px-6 whitespace-pre-wrap md:whitespace-normal block text-right">
                아침 챙겨 먹기
              </div>
              <div className="flex gap-6">
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[160px] px-6 whitespace-pre-wrap md:whitespace-normal block text-right">
                React 스터디 책 1챕터 읽기
              </div>
              <div className="flex gap-6">
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[160px] px-6  whitespace-pre-wrap md:whitespace-normal block text-right">
                스트레칭
              </div>
              <div className="flex gap-6">
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[160px] px-6  whitespace-pre-wrap md:whitespace-normal block text-right">
                사이드 프로젝트
              </div>
              <div className="flex gap-6">
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[160px] px-6 whitespace-pre-wrap md:whitespace-normal block text-right">
                물 2L 마시기
              </div>
              <div className="flex gap-6">
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
                <img src={paw} alt="paw" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default HabitTracker;
