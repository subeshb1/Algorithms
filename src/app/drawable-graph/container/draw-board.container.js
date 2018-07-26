import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState, getDrawableMode } from "../reducers";
import { draw_action } from "../actions";
const DrawBoard = props => {
  const {
    draw: {
      list: { node, arc },
      loading,
      pressed,
      action: { selected, isDrag,temp }
    },
    mode,
    onPress,
    onRelease,
    makeBlock
  } = props;
  return (
    <div className="drawboard draw-drawboard">
      <style>
        {`
        svg{
          -webkit-user-select: none; /* webkit (safari, chrome) browsers */
          -moz-user-select: none; /* mozilla browsers */
          -khtml-user-select: none; /* webkit (konqueror) browsers */
          -ms-user-select: none; /* IE10+ */
          touch-action: ${selected ? "none" : "auto"};
        }
          
            circle {
            stroke: ${loading ? "white" : "grey"}; 
            fill:white;
            stroke-width: 2px;
            cursor: ${mode === 0 ? "move" : ""}
            }
            circle.start {
              fill: ${loading ? "white" : "#ff9696"};
            }
            circle.end {
              fill: ${loading ? "white" : "#39e6ab"};
            }
            circle.UNVISITED {
              fill: white;
            }
            circle.VISITED {
              fill:  ${loading ? "white" : "#9effac"};
            }
            circle.EXPLORED {
              fill:  ${loading ? "white" : "#aff6ff"};
            }
            circle.PATH {
              fill:  ${loading ? "white" : "#94e3ff"};
            }
            circle.BLOCK {
              fill:  ${loading ? "white" : "#c1c1c1"};
            }
            svg text {
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
          }
          svg text::selection {
              background: none;
          }
          text {
            position: relative;
            z-index:1 ;
          }
          .selected {
            stroke-dasharray: 5px;
          }
          `}
      </style>
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        onMouseUp={() => onRelease()}
        onPointerDown={props.onSVGDown}
        onPointerUp={props.onNodeRelease}
        onPointerMove={e => isDrag && props.onNodeMove(e)}
        onTouchMove={e => isDrag && props.onNodeMove(e)}
      >
        {Object.values(arc).map(({ from, to, key }, i) => (
          <line
            x1={node[from].x}
            y1={node[from].y}
            x2={node[to].x}
            y2={node[to].y}
            stroke="black"
            strokeWidth="2"
            key={key}
            className={
              selected && selected.type === "ARC" && selected.item === key
                ? "selected"
                : ""
            }
          />
        ))}
        {Object.values(node).map(({ x, y, key }, i) => (
          <circle
            cx={x}
            cy={y}
            r="30"
            key={i}
            className={
              (selected && selected.type === "NODE" && selected.item === key) || temp===key
                ? "selected"
                : ""
            }
            onPointerDown={() =>
              (mode === 0 || mode === 2) && props.onNodePress(key)
            }
          />
        ))}
      </svg>
    </div>
  );
};
const mapStateToProps = state => ({
  draw: getDrawBoardState(state),
  mode: getDrawableMode(state)
});

export default connect(
  mapStateToProps,
  draw_action
)(DrawBoard);
