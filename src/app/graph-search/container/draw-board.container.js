import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState } from "../reducers";
const DrawBoard = props => {
  const {
    draw: {
      list: { graph, row, col },
      loading
    }
  } = props;
  const m = 100,
    n = 50;
  return (
    <div className="drawboard">
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${row}0 ${col}0`}
        vectorEffect="none"
      >
        <style>
          {`rect {`}
          stroke: {loading ? "white" : "black"}; vector-effect:{" "}
          {loading ? "" : "non-scaling-stroke"};
          {"}"}
          {`
            rect.start {
              fill: ${loading ? "white" : "red"};
            }
            rect.end {
              fill: ${loading ? "white" : "green"};
            }
          `}
        </style>
        {graph.map(({ color, ...x }, i) => (
          <rect
            fill={color}
            {...x}
            key={i}
            width="10"
            height="10"
            stroke="black"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  draw: getDrawBoardState(state)
});

export default connect(mapStateToProps)(DrawBoard);
