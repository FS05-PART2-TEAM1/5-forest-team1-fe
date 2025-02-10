import React from "react";
import { Link } from "react-router-dom";
import bracketIcon from "@/assets/icons/ic_bracket.png";
import { useLocation } from "react-router-dom";

export const FocusHeader = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col items-start justify-between mb-[16px] md:flex-row md:items-center">
      <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#414141] mb-4 md:mb-0">
        {location.state.studyData.nickname}의 {location.state.studyData.title}
      </h1>
      <div className="flex gap-4">
        <Link to="/habit">
          <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
            오늘의 습관{" "}
            <img src={bracketIcon} alt="" className="inline-block ml-[14px]" />
          </button>
        </Link>
        <Link to="/">
          <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
            홈{" "}
            <img src={bracketIcon} alt="" className="inline-block ml-[14px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};
