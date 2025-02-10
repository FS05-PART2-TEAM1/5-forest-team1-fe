import React from "react";
import TimerButton from "@/common/buttons/TimerButton";
import TimerCircleButton from "@/common/buttons/TimerCircleButton";
import playIcon from "@/assets/icons/ic_play.png";
import pauseIcon from "@/assets/icons/ic_pause.png";
import resetIcon from "@/assets/icons/ic_restart.png";
import stopIcon from "@/assets/icons/ic_stop.png";

export const FocusTimer = ({
  timeLeft,
  isRunning,
  formatTime,
  startTimer,
  pauseTimer,
  resetTimer,
  finishTimer,
  handlePointsUpdate,
  customTime,
}) => {
  return (
    <div className="rounded-[20px] border border-[#dddddd] pt-6 md:pt-10">
      <h2 className="text-center text-[24px] font-extrabold text-f-black mb-2">
        오늘의 집중
      </h2>
      <p className="text-center text-sm text-gray-500 mb-[30px]">
        목표 시간: {customTime}분
      </p>
      <div className="text-center">
        <div
          className={`text-[80px] md:text-[120px] font-extrabold mb-[50px] md:mb-[94px] ${
            timeLeft === customTime * 60
              ? "text-f-black"
              : timeLeft >= 0
              ? "text-red-500"
              : "text-f-gray-500"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-6">
          {!isRunning && timeLeft === customTime * 60 ? (
            <TimerButton onClick={startTimer} img={playIcon}>
              Start!
            </TimerButton>
          ) : (
            <div className="flex justify-center gap-2 md:gap-6">
              {timeLeft >= 0 ? (
                <>
                  <TimerCircleButton
                    onClick={pauseTimer}
                    img={pauseIcon}
                    disabled={!isRunning}
                  />
                  <TimerButton
                    onClick={startTimer}
                    img={playIcon}
                    disabled={isRunning}
                  >
                    Start!
                  </TimerButton>
                  <TimerCircleButton onClick={resetTimer} img={resetIcon} />
                </>
              ) : (
                <TimerButton
                  onClick={() => {
                    finishTimer();
                    handlePointsUpdate();
                  }}
                  img={stopIcon}
                >
                  Stop!
                </TimerButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
