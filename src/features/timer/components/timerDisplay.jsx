import React from "react";
import { formatTime } from "../../../utils/helper";

const TimerDisplay = (props) => {
  return (
    <div className="wrapper">
      <div id="button-wrapper">
        <div id="timer-label">{props.break ? "BREAK" : "SESSION"}</div>
        <div id="time-left">{formatTime(props.timer)}</div>
        <div>
          <button id="start_stop" onClick={props.startStop}>
            {props.timerOn ? "Pause" : "Play"}
            <i className="fa fa-play" aria-hidden="true" />
            <i className="fa fa-pause" aria-hidden="true" />
          </button>
          <button id="reset" onClick={props.reset}>
            reset
            <i className="fa fa-refresh" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
