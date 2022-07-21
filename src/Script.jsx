import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      break: false,
      timer: 1500, //in seconds, default is 1500
      breakTime: 5, //in minutes, default is 5
      sessionTime: 25, //in minutes, default is 25
    };
    this.reset = this.reset.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  reset() {
    this.setState({
      timerOn: false,
      break: false,
      timer: 1500,
      breakTime: 5,
      sessionTime: 25,
    });
    clearInterval(this.timer);
    let beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  }

  startStopTimer() {
    if (this.state.timerOn === true) {
      this.setState({ timerOn: false });
      clearInterval(this.timer);
    } else if (this.state.timerOn === false) {
      this.setState({ timerOn: true });
      if (this.state.timer > 0) {
        this.timer = setInterval(() => {
          let currTimer = this.state.timer;
          let breakStatus = this.state.break;
          if (currTimer > 0) {
            currTimer -= 1;
          } else if (currTimer === 0 && breakStatus === false) {
            currTimer = this.state.breakTime * 60;
            breakStatus = true;
          } else if (currTimer === 0 && breakStatus === true) {
            currTimer = this.state.sessionTime * 60;
            breakStatus = false;
          }
          this.setState({
            timer: currTimer,
            break: breakStatus,
          });
        }, 1);
      }
    }
  }

  increment(timerType) {
    if (timerType === "session") {
      if (this.state.sessionTime < 60) {
        let newSession = this.state.sessionTime + 1;
        this.setState({
          sessionTime: newSession,
          timer: newSession * 60,
        });
      }
    } else if (timerType === "break") {
      if (this.state.breakTime < 60) {
        this.setState({ breakTime: this.state.breakTime + 1 });
      }
    }
  }

  decrement(timerType) {
    if (timerType === "session") {
      if (this.state.sessionTime > 1) {
        let newSession = this.state.sessionTime - 1;
        this.setState({
          sessionTime: newSession,
          timer: newSession * 60,
        });
      }
    } else if (timerType === "break") {
      if (this.state.breakTime > 1) {
        this.setState({ breakTime: this.state.breakTime - 1 });
      }
    }
  }

  render() {
    return (
      <div className="container text-center">
        <TimerDisplay
          timerOn={this.state.timerOn}
          timer={this.state.timer}
          startStop={this.startStopTimer}
          reset={this.reset}
          break={this.state.break}
        />
        <TimerSetting
          onplay={this.state.timerOn}
          breakTime={this.state.breakTime}
          sessionTime={this.state.sessionTime}
          increment={this.increment}
          decrement={this.decrement}
        />
      </div>
    );
  }
}

const TimerDisplay = (props) => {
  const minute = Math.floor(props.timer / 60);
  const second = Math.floor(props.timer % 60);

  let currTime = `${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`;

  let beep = document.getElementById("beep");
  if (props.timer === 0) {
    beep.play();
  }

  return (
    <div className="wrapper">
      <div className="row justify-content-center" id="timer-label">
        {props.break ? "BREAK" : "SESSION"}
      </div>
      <div className="row justify-content-center num" id="time-left">
        {currTime}
      </div>
      <div className="row justify-content-center">
        <button
          className="btn btn-light"
          id="start_stop"
          onClick={props.startStop}
        >
          {props.timerOn ? "Pause" : "Play"}
          <i className="fa fa-play" aria-hidden="true" />
          <i className="fa fa-pause" aria-hidden="true" />
        </button>
        <button className="btn btn-light ml-1" id="reset" onClick={props.reset}>
          reset
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
      </div>
      <audio
        id="beep"
        src="http://www.trekcore.com/audio/computer/hailalert_1.mp3"
      />
    </div>
  );
};

const TimerSetting = (props) => {
  return (
    <div className="wrapper">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="session-label">SESSION LENGTH</div>
          <div id="session-length" className="timer-set">
            <button
              disabled={props.onplay}
              className="btn btn-light"
              id="session-increment"
              onClick={(e) => {
                props.increment("session");
              }}
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
            <span className="num">{props.sessionTime}</span>
            <button
              disabled={props.onplay}
              className="btn btn-light"
              id="session-decrement"
              onClick={(e) => {
                props.decrement("session");
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div id="break-label">BREAK LENGTH</div>
          <div id="break-length" className="timer-set">
            <button
              disabled={props.onplay}
              className="btn btn-light"
              id="break-increment"
              onClick={(e) => {
                props.increment("break");
              }}
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
            <span className="num">{props.breakTime}</span>
            <button
              disabled={props.onplay}
              className="btn btn-light"
              id="break-decrement"
              onClick={(e) => {
                props.decrement("break");
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
