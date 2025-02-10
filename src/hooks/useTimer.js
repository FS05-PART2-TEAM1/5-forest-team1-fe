import { useState, useEffect } from "react";

export const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [totalPauseTime, setTotalPauseTime] = useState(0);

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
    const now = new Date();
    if (!isRunning) {
      setIsRunning(true);
      setIsCompleted(false);
      if (pauseStartTime) {
        const pauseDuration = now - pauseStartTime;
        setTotalPauseTime((prevTime) => prevTime + pauseDuration);
        setPauseStartTime(null);
      } else {
        setStartTime(now);
        setTotalPauseTime(0);
      }
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setPauseStartTime(new Date());
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setIsCompleted(false);
    setPauseStartTime(null);
    setTotalPauseTime(0);
  };

  const finishTimer = () => {
    setIsRunning(false);
    setIsCompleted(true);
    setTimeLeft(initialTime);
  };

  const getTimerData = () => {
    return {
      startTime,
      totalPauseTime,
      finishTime: new Date(),
    };
  };

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return {
    timeLeft,
    isRunning,
    isCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    finishTimer,
    getTimerData,
  };
};
