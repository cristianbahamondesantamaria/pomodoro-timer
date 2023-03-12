import React, { useState, useEffect } from 'react';

const BREAK_TIME = 5; // 5 minutes in seconds
const WORK_TIME = 10; // 25 minutes in seconds

function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);
  const [breakTime, setBreakTime] = useState(BREAK_TIME); // 5 minutes in seconds  
  const [workTime, setWorkTime] = useState(WORK_TIME); // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if(!isBreak) {
            if (workTime > 0) {
                setWorkTime((workTime) => workTime - 1);
            }else {
                setIsBreak(true);
                setWorkTime(WORK_TIME);
            }
        }else {
            if (breakTime > 0) {
                setBreakTime((breakTime) => breakTime - 1);
            }else {
                setIsBreak(false);
                setBreakTime(BREAK_TIME);
            }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [breakTime, isActive, isBreak, workTime]);


  function startTimer() {
    setIsActive(true);
  }

  function stopTimer() {
    setIsActive(false);
  }

  function resetTimer() {
    setWorkTime(5);
    setIsActive(false);
    setIsBreak(false);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className={`pomodoro-wrapper ${
        isActive ? isBreak ? 'bg-green-700' : 'bg-red-800' : 'bg-gray-500'
      }`}>

        <div class={`flex flex-col items-center justify-center w-4/5 rounded overflow-hidden shadow-lg h-3/5 ${
            isActive ? isBreak ? 'bg-green-600 text-gray-200' : 'bg-red-700 text-gray-200' : 'bg-gray-400 text-gray-800'  
        }`}>
            <div class=" flex flex-col items-center justify-center px-12 py-10">
                <h1 className="text-4xl font-bold text-gray-200 mb-4">
                    {isBreak ? 'Take a break!' : 'Time to work!'}
                </h1>
                <div className="text-9xl font-bold text-gray-200 mb-8">{isBreak ? formatTime(breakTime) : formatTime(workTime)}</div>
                <div className="flex space-x-4 mb-8">
                    <button class={`font-bold py-2 px-4 border-b-4  rounded ${
                        isActive ? 'bg-gray-500 hover:bg-gray-400 border-gray-700 hover:border-gray-500 text-gray-200' : 'bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500 text-gray-800'
                        }`}
                        onClick={isActive ? stopTimer : startTimer}
                    >
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Skip
                    </button>
                </div>
            </div>
        </div>  
      
    </div>
  );
}

export default PomodoroTimer;