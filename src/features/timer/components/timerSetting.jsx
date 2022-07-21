const TimerSetting = (props) => {
  return (
    <div className="wrapper">
      <div id="button-setting-wrapper">
        <div>
          <div id="session-label">SESSION LENGTH</div>
          <div className="buttons-container">
            <button
              disabled={props.onplay}
              id="session-increment"
              onClick={(e) => {
                props.increment("session");
              }}
            >
              up
            </button>
            <span id="session-length" className="num">
              {props.sessionTime}
            </span>
            <button
              disabled={props.onplay}
              id="session-decrement"
              onClick={(e) => {
                props.decrement("session");
              }}
            >
              down
            </button>
          </div>
        </div>
        <div>
          <div id="break-label">BREAK LENGTH</div>
          <div className="buttons-container">
            <button
              disabled={props.onplay}
              id="break-increment"
              onClick={(e) => {
                props.increment("break");
              }}
            >
              up
            </button>
            <span id="break-length" className="num">
              {props.breakTime}
            </span>
            <button
              disabled={props.onplay}
              id="break-decrement"
              onClick={(e) => {
                props.decrement("break");
              }}
            >
              down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerSetting;
