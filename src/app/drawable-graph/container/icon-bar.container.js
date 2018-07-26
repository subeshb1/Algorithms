import React from "react";
import { connect } from "react-redux";

import { icon_action } from "../actions";
import { getDrawableMode } from "../reducers";

import select from "../../assets/icon/marker.svg";
import arc from "../../assets/icon/arc.svg";
import node from "../../assets/icon/node.svg";

const icons = [[select, "s"], [node, "c"], [arc, "a"]];
const IconBar = props => {
  const { mode } = props;
  return (
    <div className="menu icon-bar ">
      {icons.map(([x, a], i) => (
        <div key={i} onClick={() => mode !== i && props.changeMode(i)}>
          <img
            src={x}
            accessKey={a}
            alt={`mode ${i} icon`}
            className={mode === i ? "active" : undefined}
            tabIndex="0"
          />
        </div>
      ))}
    </div>
  );
};
const mapStateToProps = state => ({
  mode: getDrawableMode(state)
});

export default connect(
  mapStateToProps,
  { ...icon_action }
)(IconBar);
