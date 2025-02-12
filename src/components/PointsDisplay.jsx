import React from "react";
import { EarnedPointsBoxMd } from "@/common/EarnedPointsBox";

export const PointsDisplay = ({ currentPoints }) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <p className="text-[#818181] text-[16px] md:text-[18px] font-normal">
        현재까지 획득한 포인트
      </p>
      <EarnedPointsBoxMd points={currentPoints} />
    </div>
  );
};
