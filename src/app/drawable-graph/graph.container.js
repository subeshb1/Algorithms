import React from "react";
import Menu from "../components/menu";
import ToolBar from "./container/tool-bar.container";
import DrawBoard from "./container/draw-board.container";
import IconBar from "./container/icon-bar.container";
import "./css/index.css";

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
    <div className="container">
      <Menu className="menu" items={menuItems} />
      <IconBar />
      <DrawBoard />
      <ToolBar
        algo={getAlgoFromPath(pathname.replace(path, ""))}
        className="tool-bar draw-tool-bar"
      />
    </div>
  );
};

export default Sorting;
