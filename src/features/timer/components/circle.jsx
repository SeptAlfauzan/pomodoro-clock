import React from "react";

export default function Circle({ len }) {
  const maxLength = 126;
  const [length, setLength] = React.useState(maxLength);
  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const [viewbox, setViewbox] = React.useState(null);

  const { innerWidth } = windowSize;

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  React.useEffect(() => {
    console.log(innerWidth);
    innerWidth <= 600 ? setViewbox("0 0 80 80") : setViewbox("0 0 65 65");
  }, [innerWidth]);

  React.useEffect(() => {
    const remaining = (maxLength * len) / 100;
    setLength(remaining);
  }, [len]);

  return (
    <div id="circle-container">
      <svg
        viewBox={viewbox}
        // preserveAspectRatio="relative"
        width="100%"
        height="100%"
        id="circle"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cc51ff" />
            <stop offset="100%" stopColor="#df77fd" />
          </linearGradient>
        </defs>
        {/* <g transform="translate(144.6052703857422, -3.8036041259765625)"> */}
        <circle
          className="circle_path"
          strokeWidth={"1px"}
          stroke={"grey"}
          cy="50%"
          cx="50%"
          r="20"
        />
        <circle
          stroke="url(#gradient)"
          id="circle_path_remaining"
          strokeWidth={"1px"}
          cy="50%"
          cx="50%"
          r="20"
          strokeDasharray={`${length} ${maxLength}`}
        />
        {/* </g> */}
      </svg>
    </div>
  );
}
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
