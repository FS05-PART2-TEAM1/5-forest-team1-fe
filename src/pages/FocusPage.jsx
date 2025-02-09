import React, { useState, useEffect } from "react";
import { fetchPoints, updatePoints } from "@/api/pointApi";
import { FocusTimer } from "@/components/FocusTimer";
import { FocusHeader } from "@/components/FocusHeader";
import { PointsDisplay } from "@/components/PointsDisplay";
import ErrorMessage from "@/common/MessageBox";

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
      setIsCompleted(false);
      // 일시정지 후 재시작하는 경우, 일시정지 시간 합산
      if (pauseStartTime) {
        const pauseDuration = startTime - pauseStartTime;
        setTotalPauseTime((prevTime) => prevTime + pauseDuration);
        setPauseStartTime(null);
      } else {
        // 처음 시작하는 경우, 시작 시간 설정
        setStartTime(startTime);
        setTotalPauseTime(0);
      }
    }
  };

  // 타이머 일시정지
  const pauseTimer = () => {
    const pauseStartTime = new Date();
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

  // 타이머 종료
  const finishTimer = async () => {
    const finishTime = new Date();
    const extraTime = Math.abs(timeLeft) / 60;
    const points = calculatePoints(extraTime);

    // start time과 finish time의 차이 계산
    const totalDuration = finishTime.getTime() - startTime.getTime();

    // 실제 집중 시간 = 총 시간 - 일시정지 시간
    const actualFocusTime = Math.floor((totalDuration - totalPauseTime) / 1000);

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
      <div className="w-[95%] min-w-[380px] mx-auto bg-white rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
        <FocusHeader />
        <PointsDisplay currentPoints={currentPoints} />
        <FocusTimer
          timeLeft={timeLeft}
          isRunning={isRunning}
          formatTime={formatTime}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
          finishTimer={finishTimer}
        />
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
