import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(6); // 5 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      setIsBreak(true);
    }
  }, [time]);

  useEffect(() => {
    if (isBreak) {
      setTime(breakTime);
    } else {
      setTime(1500);
    }
  }, [isBreak]);

  function startTimer() {
    setIsActive(true);
  }

  function stopTimer() {
    setIsActive(false);
  }

  function resetTimer() {
    setTime(1500);
    setBreakTime(300);
    setIsActive(false);
    setIsBreak(false);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {isBreak ? 'Take a break!' : 'Time to work!'}
      </h1>
      <div className="text-6xl font-bold text-green-500 mb-8">{formatTime(time)}</div>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full ${
            isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
          onClick={isActive ? stopTimer : startTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-2 rounded-full bg-gray-400 hover:bg-gray-500 text-white"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            setBreakTime((breakTime) => breakTime + 60);
          }}
        >
          Increase Break Time
        </button>
        <button
          className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            setBreakTime((breakTime) => breakTime - 60);
          }}
        >
          Decrease Break Time
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;