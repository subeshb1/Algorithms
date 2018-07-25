import React from "react";
import Menu from "../../components/menu";
import select from "../../assets/icon/marker.svg";
import arc from "../../assets/icon/arc.svg";
import node from "../../assets/icon/node.svg";
const Icon1 = (
  <div>
    <img src={node} alt="node-icon" tabIndex="0" />
  </div>
);
const Icon2 = (
  <div>
    <img src={arc} alt="arc-icon" tabIndex="0" />
  </div>
);

const Icon3 = (
  <div>
    <img src={select} alt="select-icon" tabIndex="0" />
  </div>
);

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
// eslint-disable-next-line
let menuItems = links.map(item => ({
  className: "item",
  children: getName(item),
  to: "/graph-search" + item
}));
export default () => {
  return (
    <Menu className="menu icon-bar ">
      {Icon1}
      {Icon2}
      {Icon3}
    </Menu>
  );
};
