import React from "react";
import { connect } from "react-redux";

const DrawBoard = props => {
  return <div className="drawboard" />;
};
const mapStateToProps = (state, ownProps) => ({
});

export default connect(
  mapStateToProps,
)(DrawBoard);
