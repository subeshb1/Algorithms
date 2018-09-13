import React from "react";
import ToolBar from "./container/tool-bar.container";

import Menu from "../components/menu";
import DrawBoard from "./container/draw-board.container";

import { Helmet } from "react-helmet";

const headData = {
  bfs: {
    description:
      "Breadth First Search (BFS) algorithm traverses a graph in a breadthward motion and uses a queue to remember to get the next vertex to start a search, when a dead end occurs in any iteration. Learn and visualize BFS",
    title: "Breadth First Search (BFS) - Programmer's Zen",
    keyword:
      "breadth first search, bfs, searching, algorithms, complexity, design and analysis of algorithm, bfs code, breadth first search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  dfs: {
    description:
      "Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. Learn Visualize DFS",
    title: "Depth First Search (DFS) - Programmer's Zen",
    keyword:
      "depth first search, dfs, searching, algorithms, complexity, design and analysis of algorithm, dfs code, depth first search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  "a-star": {
    description:
      "A* is the most popular choice for pathfinding, because it's fairly flexible and can be used in a wide range of contexts. A* is like Dijkstra's Algorithm in that it can be used to find a shortest path. Learn and Visualize A star.",
    title: "A Star (A*) - Programmer's Zen",
    keyword:
      "a-star search, a*, searching, algorithms, complexity, design and analysis of algorithm, a star code, a-star search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  },
  dijkstras: {
    description:
      "One algorithm for finding the shortest path from a starting node to a target node in a weighted graph is Dijkstra's algorithm.  Learn and Visualize Dijkstras",
    title: "Heap Sort - Programmer's Zen",
    keyword:
      "dijkstras  search, dijkstras, searching, algorithms, complexity, design and analysis of algorithm, dijkstras code, dijkstras algorithm search code, graph search, graph algorithms,c++,java,javascript,html,python,c,data structure"
  }
};
class Head extends React.Component {
  render() {
    const { algo } = this.props;
    const data = headData[algo];
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keyword" content={data.keyword} />
      </Helmet>
    );
  }
}

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
  const algo = getAlgoFromPath(pathname.replace(path, ""));
  return (
    <div className="container">
      <Head algo={algo} />
      <Menu className="menu" items={menuItems} />
      <DrawBoard />
      <ToolBar algo={algo} />
    </div>
  );
};

export default Sorting;
