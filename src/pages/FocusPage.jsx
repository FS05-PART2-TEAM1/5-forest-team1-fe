import React, { useState, useEffect } from "react";

function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25분을 초로 변환
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-screen h-screen bg-[#F6F4EF] py-[153px]">
      <div className="w-[95%] mx-auto bg-white rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
        <div className="flex flex-col items-start justify-between mb-[21px] md:flex-row md:items-center">
          <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#414141] mb-4 md:mb-0">
            연우의 개발공장
          </h1>
          <div className="flex gap-4">
            <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
              오늘의 습관
            </button>
            <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
              홈
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-[#818181] text-[16px] md:text-[18px] font-normal">
            현재까지 획득한 포인트
          </p>
          <p className="text-[14px] md:text-[16px] flex items-center">
            <span className="text-green-600">🌱</span> 310P 획득
          </p>
        </div>

        <div className="rounded-[20px] border border-[#dddddd] pt-6 md:pt-10">
          <h2 className="text-center text-[24px] font-extrabold text-[#414141] mb-[50px] md:mb-[100px]">
            오늘의 집중
          </h2>
          <div className="text-center">
            <div
              className={`text-[80px] md:text-[120px] font-extrabold mb-[50px] md:mb-[94px] ${
                isRunning ? "text-red-500" : "text-[#414141]"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
            {!isRunning && timeLeft === 25 * 60 ? (
              <button
                onClick={startTimer}
                className="bg-[#99C08E] text-white w-[140px] md:w-[333px] h-[45px] md:h-[60px] mb-[50px] md:mb-[40px] rounded-full font-extrabold text-[18px] text-center md:text-[28px]"
              >
                <span className="mr-3 md:mr-6 text-[20px] md:text-[30px]">
                  ▶
                </span>
                Start!
              </button>
            ) : (
              <div className=" mb-[50px] md:mb-[40px] flex justify-center items-center gap-2 md:gap-6">
                <button
                  onClick={pauseTimer}
                  className="bg-f-green-600 text-white w-12 md:w-16 h-[45px] md:h-[60px] rounded-full font-extrabold text-[18px] text-center md:text-[28px] flex items-center justify-center"
                >
                  <span className="text-[20px] md:text-[30px]">⏸</span>
                </button>
                <button
                  onClick={startTimer}
                  disabled={isRunning}
                  className={`${
                    isRunning
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#99C08E]"
                  } text-white w-[140px] md:w-[333px] h-[45px] md:h-[60px] rounded-full font-extrabold text-[18px] text-center md:text-[28px]`}
                >
                  <span className="mr-3 md:mr-6 text-[20px] md:text-[30px]">
                    ▶
                  </span>
                  Start!
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-[#99C08E] text-white w-12 md:w-16 h-[45px] md:h-[60px] rounded-full font-extrabold text-[18px] text-center md:text-[28px] flex items-center justify-center"
                >
                  <span className="text-[20px] md:text-[30px]">↺</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusPage;
