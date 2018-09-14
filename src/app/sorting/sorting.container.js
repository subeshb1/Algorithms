import React from "react";
import ToolBar from "./container/tool-bar.container";

import Menu from "../components/menu";
import DrawBoard from "./container/draw-board.container";

import { Helmet } from "react-helmet";

const headData = {
  "bubble-sort": {
    description:
      "Bubble Sort is one of the simplest Algorithms. Learn how bubble sort works and visualize it. It's complexity is O(n). It works by repeatedly swapping the adjacent elements if they are in wrong order.",
    title: "Bubble Sort | Sketch Algorithms",
    keyword:
      "bubble sort,sorting, algorithms, complexity, design and analysis of algorithm, bubble sort code, bubble sorting,c++,java,javascript,html,python,c,data structure"
  },
  "merge-sort": {
    description:
      "Merge Sort is a Divide and Conquer Algorithm like Quick Sort. Learn how Merge sort works and visualize it. It's complexity is O(n logn). It divides input array in two halves, calls itself for the two halves and then merges the two sorted arrays.",
    title: "Merge Sort | Sketch Algorithms",
    keyword:
      "merge sort,sorting, algorithms, complexity, design and analysis of algorithm, merge sort code, merge sorting, divide and conquer,c++,java,javascript,html,python,c,data structure"
  },
  "quick-sort": {
    description:
      "Quick Sort is a Divide and Conquer Algorithm like Merge Sort. Learn how Quick sort works and visualize it. It's complexity is O(n logn). It picks an element as pivot and partitions the given array around the picked pivot.",
    title: "Quick Sort | Sketch Algorithms",
    keyword:
      "quick sort,sorting, algorithms, complexity, design and analysis of algorithm, quick sort code, quick sorting, divide and conquer,c++,java,javascript,html,python,c,data structure"
  },
  "heap-sort": {
    description:
      "Heap sort sorts by building a heap tree. Learn how Heap sort works and visualize it. It's complexity is O(n logn). A heap is a partially sorted binary tree that is stored inside an array.",
    title: "Heap Sort | Sketch Algorithms",
    keyword:
      "heap sort,sorting, algorithms, complexity, design and analysis of algorithm, heap sort code, heap sorting, heap tree,c++,java,javascript,html,python,c,data structure"
  },
  "selection-sort": {
    description:
      "Selection sort like its name suggests selects the smallest element at every pass, meaning in every pass an item is placed in order. Learn how Selection sort works and visualize it. It's complexity is O(n^2). Selection ",
    title: "Selection Sort | Sketch Algorithms",
    keyword:
      "selection sort,sorting, algorithms, complexity, design and analysis of algorithm, selection sort code, selection sorting, selection tree,c++,java,javascript,html,python,c,data structure"
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

const links = [
  "/bubble-sort",
  "/quick-sort",
  "/selection-sort",
  "/merge-sort",
  "/heap-sort"
];

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

const Sorting = ({ match: { path }, location: { pathname } }) => {
  const algo = getAlgoFromPath(pathname.replace(path, ""));
  return (
    <React.Fragment>
      <div className="container">
        <Head algo={algo} />
        <Menu className="menu" items={menuItems} />
        <DrawBoard />
        <ToolBar algo={algo} />
      </div>
    </React.Fragment>
  );
};

export default Sorting;
