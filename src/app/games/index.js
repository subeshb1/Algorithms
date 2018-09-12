import React, { Component } from "react";
import "./css/index.css";
import { DrawBoard, ToolBar } from "./containers";
import Menu from "../components/menu";

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

export default class index extends Component {
  render() {
    return (
      <div className="container">
        <Menu className="menu" items={menuItems} />
        <DrawBoard />
        <ToolBar />
      </div>
    );
  }
}
