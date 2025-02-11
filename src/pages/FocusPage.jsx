import React, { useState, useEffect } from "react";
import { Header } from "@/common/layout/Header";
import { fetchPoints, updatePoints } from "@/api/pointApi";
import { FocusTimer } from "@/components/FocusTimer";
import { FocusHeader } from "@/components/FocusHeader";
import { PointsDisplay } from "@/components/PointsDisplay";
import ErrorMessage from "@/common/MessageBox";
import { useTimer } from "@/hooks/useTimer";
import { useLocation } from "react-router-dom";

function FocusPage() {
  const location = useLocation();
  const [customTime, setCustomTime] = useState(25); // 기본값 25분
  const INITIAL_TIME = customTime * 60;

  const {
    timeLeft,
    isRunning,
    isCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    finishTimer,
    getTimerData,
    setTimeLeft,
  } = useTimer(INITIAL_TIME);

  const [earnedPoints, setEarnedPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [studyId, setStudyId] = useState(location.state.studyData.id);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPointsUpdateLoading, setIsPointsUpdateLoading] = useState(false);

  // 초기 포인트 로딩, 포인트 업데이트
  useEffect(() => {
    fetchPoints(studyId).then((points) => setCurrentPoints(points));
  }, [studyId]);

  const handlePointsUpdate = async () => {
    setIsPointsUpdateLoading(true);
    const extraTime = Math.abs(timeLeft) / 60;
    const points = calculatePoints(extraTime);
    const { startTime, totalPauseTime, finishTime } = getTimerData();

    // 실제 집중 시간 계산
    const totalDuration = finishTime.getTime() - startTime.getTime();
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
      setEarnedPoints(points);
      setCurrentPoints(updatedTotalPoints);
    } catch (error) {
      resetTimer();
      setErrorMessage("포인트 적립에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsPointsUpdateLoading(false);
    }
  };

  // 포인트 계산
  const calculatePoints = (extraTime) => {
    // 기본 포인트 설정
    let basePoints;
    switch (customTime) {
      case 5:
        basePoints = 10;
        break;
      case 15:
        basePoints = 20;
        break;
      case 25:
        basePoints = 30;
        break;
      case 45:
        basePoints = 40;
        break;
      default:
        basePoints = 30;
    }

    // 추가 포인트: 10분당 5포인트
    const additionalPoints = Math.floor(extraTime / 10) * 5;
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

  // 시간 설정 핸들러 수정
  const handleTimeChange = (minutes) => {
    if (!isRunning) {
      setCustomTime(minutes);
      resetTimer();
    }
  };

  return (
    <div className="bg-f-bg">
      <Header />
      <div className="min-h-screen bg-f-bg py-10 md:py-20">
        <div className="w-[95%] min-w-[380px] mx-auto bg-white rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
          <FocusHeader />
          <PointsDisplay currentPoints={currentPoints} />
          <div className="mb-6 flex flex-col items-center">
            <div className="flex justify-center gap-2">
              {[5, 15, 25, 45].map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeChange(time)}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded-full text-sm ${
                    customTime === time
                      ? "bg-f-brand text-white"
                      : "bg-gray-100 text-gray-700"
                  } ${
                    isRunning
                      ? "opacity-80 cursor-not-allowed"
                      : "hover:bg-f-brand hover:text-white transition-colors"
                  }`}
                >
                  {time}분
                </button>
              ))}
            </div>
          </div>
          <FocusTimer
            timeLeft={timeLeft}
            isRunning={isRunning}
            formatTime={formatTime}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
            finishTimer={finishTimer}
            handlePointsUpdate={handlePointsUpdate}
            customTime={customTime}
          />
        </div>
        {errorMessage ? (
          <ErrorMessage message={errorMessage} isCompleted={false} />
        ) : !isRunning && timeLeft !== INITIAL_TIME && !isCompleted ? (
          <ErrorMessage message="집중이 중단되었습니다." isCompleted={false} />
        ) : isCompleted ? (
          <ErrorMessage
            message={
              isPointsUpdateLoading
                ? "포인트 적립 중...🌱"
                : `${earnedPoints}포인트를 획득했습니다!`
            }
            isCompleted={true}
            isLoading={isPointsUpdateLoading}
          />
        ) : null}
      </div>
    </div>
  );
}

export default FocusPage;
