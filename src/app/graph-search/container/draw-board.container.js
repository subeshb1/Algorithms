import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState } from "../reducers";
import { draw_action } from "../actions";

const DrawBoard = props => {
  const {
    draw: {
      list: { graph, row, col },
      loading,
      pressed
    },
    onPress,
    onRelease,
    makeBlock
  } = props;
  return (
    <div className="drawboard">
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${col}0 ${row}0`}
        vectorEffect="none"
        onMouseDown={() => onPress()}
        onMouseUp={() => onRelease()}
      >
        <style>
          {`rect {`}
          stroke: {loading ? "white" : "grey"}; vector-effect:{" "}
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
            stroke="grey"
            strokeWidth="0.5"
            onMouseDown={() => makeBlock(i)}
            onMouseOver={() => pressed && makeBlock(i,1)}
          />
        ))}
      </svg>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  draw: getDrawBoardState(state)
});

export default connect(
  mapStateToProps,
  draw_action
)(DrawBoard);
