import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bracketIcon from "@/assets/icons/ic_bracket.png";

export const FocusHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studyData = location.state.studyData;

  return (
    <div className="flex flex-col items-start justify-between mb-[16px] md:flex-row md:items-center">
      <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#414141] mb-4 md:mb-0">
        {location.state.studyData.nickname}의 {location.state.studyData.title}
      </h1>
      <div className="flex gap-4">
        <button
          className="px-4 md:px-6 py-3 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]"
          onClick={() => navigate("/habit", { state: { studyData } })}
        >
          오늘의 습관{" "}
          <img src={bracketIcon} alt="" className="inline-block ml-[14px]" />
        </button>

        <Link to="/home">
          <button className="px-4 md:px-6 py-3 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
            홈{" "}
            <img src={bracketIcon} alt="" className="inline-block ml-[14px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};
