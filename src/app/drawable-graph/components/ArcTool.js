import React from "react";
const euclideanDistance = (x1, x2, y1, y2) =>
  parseInt(Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5), 10);
const Arc = ({ from, to, id, deleteSelected }) => {
  return (
    <React.Fragment>
      <div className="logo">
        <svg viewBox="0 0 100 100">
          <line
            x1={0}
            x2={100}
            y1={0}
            y2={100}
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
      <button
        onClick={() => deleteSelected(id, "ARC")}
        style={{ "--btn-color": 360 }}
      >
        Delete
      </button>
    </React.Fragment>
  );
};

export default Arc;
