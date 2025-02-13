import React from "react";
import loadingImg from "@/assets/img_loading.png";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 z-50 flex flex-col items-center justify-center">
      <img src={loadingImg} alt="로딩 중" className="animate-bounce" />
      <span className="mt-4 text-xl font-bold text-f-brand">로딩중...</span>
    </div>
  );
};

export default LoadingSpinner;
