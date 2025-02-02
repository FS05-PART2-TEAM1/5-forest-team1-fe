import React from "react";

const EarnedPointsBox = ({ points = 310 }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E0E0E0] rounded-full ">
      <span className="text-xl">🌱</span>
      <span className="text-base font-medium text-[#414141]">
        {points}P 획득
      </span>
    </div>
  );
};

export default EarnedPointsBox;
