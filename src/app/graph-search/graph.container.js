import React from "react";
import ToolBar from "./container/tool-bar.container";

import Menu from "../components/menu";
import DrawBoard from "./container/draw-board.container";

const links = ["/bfs", "/dfs", "/a-star", "/dijkstras"];

const getAlgoFromPath = pathname => {
  const algo = pathname.slice(1);
  if (algo !== "dfs" && algo !== "a-star" && algo !== "dijkstras") return "bfs";
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
  to: "/graph-search" + item
}));

const Sorting = ({ match: { path }, location: { pathname } }) => {
  return (
    <div className="sorting">
      <Menu className="menu" items={menuItems} />
      <DrawBoard />
      <ToolBar algo={getAlgoFromPath(pathname.replace(path, ""))} />
    </div>
  );
};

export default Sorting;
