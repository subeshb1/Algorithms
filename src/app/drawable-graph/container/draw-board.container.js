import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState, getDrawableMode } from "../reducers";
import { draw_action } from "../actions";
const euclideanDistance = (x1, x2, y1, y2) =>
  parseInt(Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5), 10);
const Node = ({
  x,
  y,
  value,
  mode,
  nkey,
  selected,
  temp,
  onNodePress,
  start,
  end
}) => {
  return (
    <g onPointerDown={() => (mode === 0 || mode === 2) && onNodePress(nkey)}>
      {end && (
        <circle
          cx={x}
          cy={y}
          r="35"
          className={
            (selected && selected.type === "NODE" && selected.item === nkey) ||
            temp === nkey
              ? "selected"
              : ""
          }
        />
      )}
      <circle
        cx={x}
        cy={y}
        r="30"
        className={
          (selected && selected.type === "NODE" && selected.item === nkey) ||
          temp === nkey
            ? "selected"
            : ""
        }
      />
      {start && (
        <path
          d={`M ${x - 70} ${y - 3} ${x - 50} ${y - 3} ${x - 50} ${y - 10}  ${x -
            40} ${y}  ${x - 50} ${y + 10}  ${x - 50} ${y + 3} ${x - 70} ${y +
            3} Z`}
          stroke="black"
          strokeWidth="2"
          fill="grey"
        />
      )}
      {value && (
        <text x={x - 6} y={y + 5}>
          {value}
        </text>
      )}
    </g>
  );
};
const Arc = ({ x1, x2, y1, y2, value, mode, nkey, selected, onArcPress }) => {
  let dx = (x1 + x2) / 2;
  let dy = (y1 + y2) / 2;
  let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g onPointerDown={() => mode === 0 && onArcPress(nkey)}>
      <line
        {...{ x1, x2, y1, y2 }}
        stroke="black"
        strokeWidth="2"
        className={
          selected && selected.type === "ARC" && selected.item === nkey
            ? "selected"
            : ""
        }
      />
      <text
        x={dx}
        y={dy - 15}
        fontSize={20}
        transform={`rotate(${angle},${dx},${dy})`}
      >
        {euclideanDistance(x1, x2, y1, y2)}
      </text>
    </g>
  );
};
const DrawBoard = props => {
  const {
    draw: {
      list: { node, arc, start, end },
      loading,
      action: { selected, isDrag, temp }
    },
    mode,
    onRelease,
    onNodePress,
    onArcPress
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
          
            circle,line {
            stroke: ${loading ? "white" : "grey"}; 
            fill:white;
            stroke-width: 2px;
            cursor: ${mode === 0 ? "move" : ""}
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
          <Arc
            x1={node[from].x}
            y1={node[from].y}
            x2={node[to].x}
            y2={node[to].y}
            {...{
              nkey: key,
              onArcPress,
              selected,
              mode
            }}
            key={key}
          />
        ))}
        {Object.values(node).map(({ x, y, value, key }, i) => (
          <Node
            {...{
              x,
              y,
              nkey: key,
              selected,
              temp,
              mode,
              onNodePress,
              value,
              start: start === key,
              end: end === key
            }}
            key={i}
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
