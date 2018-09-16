import React from "react";
import { connect } from "react-redux";
import { getDrawBoardState, getTocMode, getToolsState } from "../reducers";
import { draw_action } from "../actions";
import { Node, Arc } from "../components";

const DrawBoard = props => {
  const {
    draw: {
      list: { node, arc, start, end },
      loading,
      action: { selected, isDrag, temp },
      searching
    },
    tool: { distance },
    mode,
    onNodePress,
    onArcPress,
    algo
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
              cursor: ${mode === 1 ? "crosshair" : ""}
            }
          
            circle {
            stroke:grey;
            fill:white;
            stroke-width: 2px;
            cursor: ${mode === 0 ? "move" : mode === 2 ? "pointer" : ""}
            }

            line.PATH{
              stroke:#00a25d;
              stroke-width:4px;
            }
            circle.UNVISITED {
              fill: white;
            }
            circle.VISITED {
              fill:  ${loading ? "white" : "#dbefff"};
            }
            circle.EXPLORED {
              fill:  ${loading ? "white" : "#00b3ca"};
            }
            circle.PATH {
              fill:  ${loading ? "white" : "#50f5ae"};
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
            animation: strokeAnim 0.5s infinite linear;
            stroke-dasharray: 5 4;
          }
          @keyframes strokeAnim {
            to {
              stroke-dashoffset: -9px;
            }
          }
          .temp {
            stroke-dasharray: 5;
          }

          `}
      </style>
      {loading && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg
        onPointerDown={e => !loading && !searching && props.onSVGDown(e)}
        onPointerUp={e => !loading && !searching && props.onNodeRelease(e)}
        onPointerMove={e =>
          !loading && !searching && isDrag && props.onNodeMove(e)
        }
        onTouchMove={e =>
          !loading && !searching && isDrag && props.onNodeMove(e)
        }
      >
        {Object.values(arc).map(({ from, value, to, key, color }) => (
          <Arc
            x1={node[from].x}
            y1={node[from].y}
            x2={node[to].x}
            y2={node[to].y}
            {...{
              nkey: key,
              onArcPress,
              show: !loading && !searching,
              selected,
              mode,
              value,
              distance,
              algo,
              color
            }}
            key={key}
          />
        ))}
        {Object.values(node).map(({ x, y, value, key, color }, i) => (
          <Node
            {...{
              x,
              y,
              nkey: key,
              selected,
              temp,
              mode,
              color,
              onNodePress,
              value,
              show: !loading && !searching,
              start: start === key,
              end: end.includes(key)
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
  mode: getTocMode(state),
  tool: getToolsState(state)
});

export default connect(
  mapStateToProps,
  draw_action
)(DrawBoard);
