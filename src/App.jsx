import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./App.css";
import { useAudio } from "./features/audio/hooks/useAudio";
import Circle from "./features/timer/components/circle";
import TimerDisplay from "./features/timer/components/timerDisplay";
import TimerSetting from "./features/timer/components/timerSetting";

const App = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [onbreak, setOnbreak] = useState(false);
  const [timer, setTimer] = useState(1500);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const interval = React.useRef(null);
  const audio = React.useRef(null);
  // custom hooks
  const [_, action] = useAudio(audio);

  const reset = () => {
    setTimerOn(false);
    setOnbreak(false);
    setTimer(1500);
    setBreakTime(5);
    setSessionTime(25);
    clearInterval(interval.current);
    action.stopAudio();
  };

  const startStopTimer = () => {
    setTimerOn((prev) => {
      if (prev) clearInterval(interval.current);
      return !prev;
    });
  };

  const handleTimer = (currTimer, breakStatus) => {
    if (currTimer > 0) {
      currTimer -= 1;
    } else if (currTimer === 0 && breakStatus === false) {
      currTimer = breakTime * 60;
      breakStatus = true;
    } else if (currTimer === 0 && breakStatus === true) {
      currTimer = sessionTime * 60;
      breakStatus = false;
    }
    return { finalTimer: currTimer, finalBreakStatus: breakStatus };
  };

  const increment = (timerType) => {
    if (timerType === "session") {
      if (sessionTime < 60) {
        let newSession = sessionTime + 1;
        setSessionTime(newSession);
        setTimer(newSession * 60);
      }
    } else if (timerType === "break") {
      if (breakTime < 60) {
        setBreakTime(breakTime + 1);
      }
    }
  };

  const decrement = (timerType) => {
    if (timerType === "session") {
      if (sessionTime > 1) {
        let newSession = sessionTime - 1;

        setSessionTime(newSession);
        setTimer(newSession * 60);
      }
    } else if (timerType === "break") {
      if (breakTime > 1) {
        setBreakTime(breakTime - 1);
      }
    }
  };

  useEffect(() => {
    if (timerOn) {
      interval.current = setInterval(() => {
        let currTimer = timer;
        let breakStatus = onbreak;

        const { finalTimer, finalBreakStatus } = handleTimer(
          currTimer,
          breakStatus
        );

        setTimer(finalTimer);
        setOnbreak(finalBreakStatus);
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    const currentinterval = interval.current;
    return () => clearInterval(currentinterval);
  });

  React.useEffect(() => {
    if (timer === 0) action.playAudio();
  }, [timer, action]);

  return (
    <div className="container">
      <Circle len={100} />
      <TimerDisplay
        timerOn={timerOn}
        timer={timer}
        startStop={startStopTimer}
        reset={reset}
        break={onbreak}
      />
      <TimerSetting
        onplay={timerOn}
        breakTime={breakTime}
        sessionTime={sessionTime}
        increment={increment}
        decrement={decrement}
      />
      <audio
        ref={audio}
        id="beep"
        src="https://fsb.zobj.net/download/bwtw423HL9kPA6SmKhXxg4UShcWJOoqknqbjIGHnI9PDnuMnOJjkEERpi-4zNCYN2vRGU11PhtyVF_P4WiuN7B5olpavNjskm2EJo_PVOJKvdVBK9hEFtVt-T4ZQ/?a=&c=72&f=windows_7_startup.mp3&special=1658415103-rOCToxAudpme14J88BOmtPNWvjTFcYVcyBu01fV4oKM%3D"
      />
    </div>
  );
};

export default App;
