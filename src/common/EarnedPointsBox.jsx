import React from "react";

// 스터디 목록 포인트 박스 white, opacity 30%
export const EarnedPointsBoxSm = ({ points }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-white bg-opacity-30 border border-[#E0E0E0] rounded-full">
      <span className="text-[12px] leading-[14px]">🌱</span>
      <span className="text-[12px] font-medium text-f-black leading-[14px]">
        {points}P 획득
      </span>
    </div>
  );
};

// 스터디 목록 포인트 박스 black, opacity 50%
export const EarnedPointsBoxSmBlack = ({ points }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-black bg-opacity-50 border border-none rounded-full ">
      <span className="text-[12px] leading-[14px]">🌱</span>
      <span className="text-[12px] font-medium text-white leading-[14px]">
        {points}P 획득
      </span>
    </div>
  );
};

// 오늘의 집중 포인트 박스
export const EarnedPointsBoxMd = ({ points }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 w-fit bg-white border border-[#E0E0E0] rounded-full ">
      <span className="text-xl">🌱</span>
      <span className="text-base font-medium text-f-black">{points}P 획득</span>
    </div>
  );
};
