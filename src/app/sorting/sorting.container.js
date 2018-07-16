import React, { Component } from "react";
import { connect } from "react-redux";
import ToolBar from "./container/tool-bar.container";
import "./css/index.css";

import Menu from "./components/menu";
import DrawBoard from "./container/draw-board.container";

const links = [
  "/bubble-sort",
  "/quick-sort",
  "/selection-sort",
  "/merge-sort",
  "/heap-sort"
];

const getMaxValue = pathname => {
  switch (pathname.slice(1)) {
    case "selection-sort":
      return 1000;
    case "quick-sort":
      return 3000;
    case "merge-sort":
      return 5000;
    case "heap-sort":
      return 3000;
    default:
      return 1000;
  }
};
const getAlgoFromPath = pathname => {
  const algo = pathname.slice(1);
  if (
    algo !== "bubble-sort" &&
    algo !== "selection-sort" &&
    algo !== "quick-sort" &&
    algo !== "merge-sort" &&
    algo !== "heap-sort"
  )
    return "bubble-sort";
  return algo;
};

const getName = pathname =>
  getAlgoFromPath(pathname)
    .split("-")
    .map(x => x.toUpperCase())
    .join(" ");

// Menu Component
let menuItems = links.map(item => ({
  className: "item",
  children: getName(item),
  to: "/sorting" + item
}));

class Sorting extends Component {
  render() {
    console.log("object");
    return (
      <div className="sorting">
        <Menu className="menu" items={menuItems} />
        <ToolBar />
        <DrawBoard />
      </div>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Sorting);
