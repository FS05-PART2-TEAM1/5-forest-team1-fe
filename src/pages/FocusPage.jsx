import React, { useState, useEffect } from "react";
import { EarnedPointsBoxMd } from "../common/EarnedPointsBox";
import TimerButton from "../common/buttons/TimerButton";
import TimerCircleButton from "../common/buttons/TimerCircleButton";
import ErrorMessage from "../common/MessageBox";
import playIcon from "../assets/icons/ic_play.png";
import pauseIcon from "../assets/icons/ic_pause.png";
import resetIcon from "../assets/icons/ic_restart.png";
import stopIcon from "../assets/icons/ic_stop.png";
import bracketIcon from "../assets/icons/ic_bracket.png";

function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(0.1 * 60); // 25분을 초로 변환
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [totalPauseTime, setTotalPauseTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [studyId, setStudyId] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);

  // 포인트 조회 from study schema
  const fetchPoints = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/studies/39cfd85c-cf40-4a0a-853a-1e4ed1be3a28`
      );
      if (!response.ok) {
        throw new Error("포인트 정보를 가져오는데 실패했습니다.");
      }
      const { totalPoints } = await response.json();

      return totalPoints;
    } catch (error) {
      console.error("포인트 로딩 실패:", error);
      throw error;
    }
  };

  useEffect(() => {
    // 초기 포인트 로딩, 포인트 업데이트
    fetchPoints().then((points) => setCurrentPoints(points));
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(new Date());
  };

  const pauseTimer = () => {
    setIsRunning(false);
    const currentTime = new Date();
    const pauseDuration = currentTime - startTime;
    setTotalPauseTime(
      (prevTotalPauseTime) => prevTotalPauseTime + pauseDuration
    );
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const finishTimer = async () => {
    const finishTime = new Date();
    const extraMinutes = Math.abs(timeLeft) / 60;
    const points = calculatePoints(extraMinutes);

    const totalDuration = finishTime - startTime;
    const actualFocusTime = totalDuration - totalPauseTime;

    try {
      const totalPoints = await fetchPoints();
      const updatedTotalPoints = totalPoints + points;

      const response = await fetch(
        `http://localhost:3000/api/studies/39cfd85c-cf40-4a0a-853a-1e4ed1be3a28/points`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            points,
            totalPoints: updatedTotalPoints,
            startedAt: startTime.toISOString(),
            finishedAt: finishTime.toISOString(),
            focusTime: Math.floor(actualFocusTime / 1000),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("집중 시간 저장에 실패했습니다.");
      }

      setIsRunning(false);
      setTimeLeft(25 * 60);
      setIsCompleted(true);
      setEarnedPoints(points);
      setFocusTime(actualFocusTime);
      setCurrentPoints(updatedTotalPoints);
    } catch (error) {
      console.error("API 오류:", error);
      // 에러 처리 로직 추가 필요
    }
  };

  // 포인트 계산 함수
  const calculatePoints = (extraMinutes) => {
    const basePoints = 3; // 기본 3포인트 (25분 완료)
    const additionalPoints = Math.floor(extraMinutes / 0.1); // 추가 시간 10분당 1포인트
    return basePoints + additionalPoints;
  };

  // 시간 포맷팅 함수
  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absoluteSeconds = Math.abs(seconds);
    const minutes = Math.floor(absoluteSeconds / 60);
    const remainingSeconds = absoluteSeconds % 60;

    return `${isNegative ? "-" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-[#F6F4EF] py-10 md:py-20">
      <div className="w-[95%] min-w-[380px] mx-auto mb-[65.5px] bg-white rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
        <div className="flex flex-col items-start justify-between mb-[21px] md:flex-row md:items-center">
          <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#414141] mb-4 md:mb-0">
            연우의 개발공장
          </h1>
          <div className="flex gap-4">
            <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
              오늘의 습관{" "}
              <img
                src={bracketIcon}
                alt=""
                className="inline-block ml-[14px]"
              />
            </button>
            <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
              홈{" "}
              <img
                src={bracketIcon}
                alt=""
                className="inline-block ml-[14px]"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-[#818181] text-[16px] md:text-[18px] font-normal">
            현재까지 획득한 포인트
          </p>
          <EarnedPointsBoxMd points={currentPoints} />
        </div>

        <div className="rounded-[20px] border border-[#dddddd] pt-6 md:pt-10">
          <h2 className="text-center text-[24px] font-extrabold text-f-black mb-[50px] md:mb-[100px]">
            오늘의 집중
          </h2>
          <div className="text-center">
            <div
              className={`text-[80px] md:text-[120px] font-extrabold mb-[50px] md:mb-[94px] ${
                timeLeft === 25 * 60
                  ? "text-f-black"
                  : timeLeft >= 0
                  ? "text-red-500"
                  : "text-f-gray-500"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center items-center gap-2 md:gap-6">
              {!isRunning && timeLeft === 25 * 60 ? (
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
                      ></TimerCircleButton>

                      <TimerButton
                        onClick={startTimer}
                        img={playIcon}
                        disabled={isRunning}
                      >
                        Start!
                      </TimerButton>

                      <TimerCircleButton
                        onClick={resetTimer}
                        img={resetIcon}
                      ></TimerCircleButton>
                    </>
                  ) : (
                    <TimerButton onClick={finishTimer} img={stopIcon}>
                      Stop!
                    </TimerButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isRunning && timeLeft !== 25 * 60 && !isCompleted ? (
        <ErrorMessage message="집중이 중단되었습니다." isCompleted={false} />
      ) : isCompleted ? (
        <ErrorMessage
          message={`${earnedPoints}포인트를 획득했습니다!`}
          isCompleted={true}
        />
      ) : null}
    </div>
  );
}

export default FocusPage;
