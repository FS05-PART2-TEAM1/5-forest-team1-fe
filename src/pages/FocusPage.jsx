import React, { useState, useEffect } from "react";
import { EarnedPointsBoxMd } from "../common/EarnedPointsBox";
import { fetchPoints, updatePoints } from "@/api/pointApi";
import TimerButton from "../common/buttons/TimerButton";
import TimerCircleButton from "../common/buttons/TimerCircleButton";
import ErrorMessage from "../common/MessageBox";
import playIcon from "../assets/icons/ic_play.png";
import pauseIcon from "../assets/icons/ic_pause.png";
import resetIcon from "../assets/icons/ic_restart.png";
import stopIcon from "../assets/icons/ic_stop.png";
import bracketIcon from "../assets/icons/ic_bracket.png";

function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(0.1 * 60); // test를 위해 25분을 0.1분으로 변환
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [totalPauseTime, setTotalPauseTime] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [studyId, setStudyId] = useState(
    "39cfd85c-cf40-4a0a-853a-1e4ed1be3a28"
  ); // 임시 studyId
  const [errorMessage, setErrorMessage] = useState("");

  // 초기 포인트 로딩, 포인트 업데이트
  useEffect(() => {
    fetchPoints(studyId).then((points) => setCurrentPoints(points));
  }, [studyId]);

  // 타이머
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // 타이머 시작
  const startTimer = () => {
    const startTime = new Date();
    if (!isRunning) {
      setIsRunning(true);
      // 일시정지 후 재시작하는 경우
      if (pauseStartTime) {
        const pauseDuration = startTime - pauseStartTime;
        setTotalPauseTime((prevTime) => prevTime + pauseDuration);
        setPauseStartTime(null);
      } else {
        // 처음 시작하는 경우
        setStartTime(startTime);
        setTotalPauseTime(0); // 총 일시정지 시간 초기화
      }
    }
  };

  // 타이머 일시정지
  const pauseTimer = () => {
    const pauseStartTime = new Date();
    // 이미 일시정지 상태일 때는 다시 pauseStartTime을 설정하지 않음
    if (isRunning) {
      setIsRunning(false);
      setPauseStartTime(pauseStartTime);
    }
  };

  // 타이머 초기화
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  //
  const finishTimer = async () => {
    const finishTime = new Date();
    const extraTime = Math.abs(timeLeft) / 60;
    const points = calculatePoints(extraTime);

    // 마지막 일시정지 시간 계산, 일시정지 시간 합산
    let finalTotalPauseTime = totalPauseTime;
    const pauseDuration = new Date() - pauseStartTime;
    if (pauseStartTime) {
      finalTotalPauseTime += pauseDuration;
    }

    // start time과 finish time의 차이 계산
    const totalDuration = finishTime.getTime() - startTime.getTime();

    // 실제 집중 시간 = 총 시간 - 일시정지 시간
    const actualFocusTime = Math.floor(
      (totalDuration - finalTotalPauseTime) / 1000
    );

    try {
      const totalPoints = await fetchPoints(studyId);
      const updatedTotalPoints = totalPoints + points;

      const pointData = {
        points,
        totalPoints: updatedTotalPoints,
        startedAt: startTime.toISOString(),
        finishedAt: finishTime.toISOString(),
        focusTime: actualFocusTime,
      };

      await updatePoints(studyId, pointData);

      setIsRunning(false);
      setTimeLeft(25 * 60);
      setIsCompleted(true);
      setEarnedPoints(points);
      setCurrentPoints(updatedTotalPoints);
    } catch (error) {
      // UI 상태 관리
      setIsRunning(false);
      setIsCompleted(false);
      // 사용자에게 에러 상태 표시
      setErrorMessage("포인트 적립에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // 포인트 계산
  const calculatePoints = (extraTime) => {
    const basePoints = 3; // 기본 3포인트 (25분 완료)
    const additionalPoints = Math.floor(extraTime / 0.1); // test를 위해 0.1분당 1포인트
    return basePoints + additionalPoints;
  };

  // 시간 포맷팅
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
    <div className="min-h-screen bg-[#F6F4EF] py-10 md:py-20">
      <div className="w-[95%] min-w-[380px] mx-auto  bg-white rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
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
      {errorMessage ? (
        <ErrorMessage message={errorMessage} isCompleted={false} />
      ) : !isRunning && timeLeft !== 25 * 60 && !isCompleted ? (
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
