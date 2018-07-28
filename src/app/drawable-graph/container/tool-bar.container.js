import React, { Component } from "react";
import { connect } from "react-redux";
import { getToolsState, getDrawBoardState } from "../reducers";
import { tools_action, draw_action } from "../actions";

import { compose, minOf, maxOf, toInt } from "../../lib";
const euclideanDistance = (x1, x2, y1, y2) =>
  toInt(Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5));
const normalizedInt = compose(
  minOf(1000),
  maxOf(0),
  toInt
);

const Node = ({
  item,
  value,
  x,
  y,
  change,
  nkey,
  start,
  end,
  setStart,
  setEnd
}) => {
  return (
    <React.Fragment>
      <div className="logo">
        <svg viewBox="0 0 100 100">
          <circle
            cx={50}
            cy="50"
            r={48}
            stroke="black"
            strokeWidth="2"
            fill="white"
          />
          <text x={42} y={55} fontSize={20}>
            {value}
          </text>
        </svg>
      </div>
      <div className="group">
        <label>
          Name
          <input
            type="text"
            value={value || ""}
            onChange={({ target: { value } }) =>
              change({ value: value.substr(0, 3) })
            }
          />
        </label>
        <label>
          Key
          <input type="text" value={nkey} readOnly />
        </label>
      </div>
      <div className="group">
        <label>
          X
          <input
            type="number"
            value={x}
            onChange={({ target: { value } }) =>
              change({ x: normalizedInt(value) })
            }
          />
        </label>
        <label>
          Y
          <input
            type="number"
            value={y}
            onChange={({ target: { value } }) =>
              change({ y: normalizedInt(value) })
            }
          />
        </label>
      </div>
      <div className="group">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={Boolean(start === nkey)}
            onChange={() => setStart(nkey)}
            // disabled={loading || searching}
          />
          Start
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={Boolean(end === nkey)}
            onChange={() => setEnd(nkey)}
            // disabled={loading || searching}
          />
          Goal
        </label>
      </div>
      <button>Delete</button>
    </React.Fragment>
  );
};
const Arc = ({ from, to, id }) => {
  return (
    <React.Fragment>
      <div className="logo">
        <svg viewBox="0 0 100 100">
          <line
            x1={0}
            x2={100}
            y1={0}
            y1={100}
            stroke="black"
            strokeWidth="2"
          />
          <text x={20} y={100} fontSize={20}>
            {euclideanDistance(from.x, to.x, from.y, to.y)}
          </text>
        </svg>
      </div>
      <label>
        ID
        <input type="text" value={id} readOnly />
      </label>
      <div className="group">
        <label>
          From
          <input
            type="text"
            value={`${from.value || ""}(${from.key})`}
            readOnly
          />
        </label>
        <label>
          To
          <input type="text" value={`${to.value || ""}(${to.key})`} readOnly />
        </label>
      </div>
      <button>Delete</button>
    </React.Fragment>
  );
};

class ToolBarC extends Component {
  componentDidUpdate({ algo }) {
    if (algo !== this.props.algo) {
      this.props.cancel();
    }
  }
  componentWillUnmount() {
    this.props.cancel();
    this.props.clear();
  }
  render() {
    const { props } = this;
    const {
      algo,
      draw: {
        action: { selected },
        list: { node, arc, start, end },
        loading,
        searching
      },
      setStart,
      setEnd
    } = props;
    return (
      <div className="tool-bar draw-tool-bar" key={"#2"}>
        <h2>
          {algo
            .split("-")
            .map(x => x.toUpperCase())
            .join(" ")}
        </h2>
        <div className="btn-group">
          <button
            className="green"
            disabled={loading || searching}
            onClick={() => props.processList(props.algo)}
          >
            Search
          </button>
          <button
            className="red"
            disabled={!searching && !loading}
            onClick={props.cancel}
          >
            Stop
          </button>
        </div>
        {selected &&
          (selected.type === "NODE" ? (
            <Node
              {...node[selected.item]}
              nkey={node[selected.item].key}
              change={props.onSelectedPropChange}
              {...{ start, end, setStart, setEnd }}
            />
          ) : (
            <Arc
              from={{ ...node[arc[selected.item].from] }}
              to={{ ...node[arc[selected.item].to] }}
              id={selected.item}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tool: getToolsState(state),
  draw: getDrawBoardState(state)
});

export default connect(
  mapStateToProps,
  { ...tools_action, ...draw_action }
)(ToolBarC);
