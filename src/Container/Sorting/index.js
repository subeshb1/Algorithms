import React from "react";
import "./index.css";
import { DrawBoard, ToolBar, MenuBar } from "../../components/ui";
const Sorting = props => {
  return (
    <div className="sorting">
      <MenuBar>
        <MenuBar.Item>Bubble Sort</MenuBar.Item>
        <MenuBar.Item>Quick Sort</MenuBar.Item>
        <MenuBar.Item>Selection Sort</MenuBar.Item>
        <MenuBar.Item>Merge Sort</MenuBar.Item>
        <MenuBar.Item>Heap Sort</MenuBar.Item>
      </MenuBar>
      <DrawBoard>
        <svg preserveAspectRatio="none" viewBox="0 0 100 100">
          {new Array(10)
            .fill(1)
            .map((x, i) => (
              <rect
                width="10px"
                height={(i + 1) * 10}
                x={i * 10}
                y={100 - (i + 1) * 10}
                fill="black"
              />
            ))}
        </svg>
      </DrawBoard>
      <ToolBar>
        <div>Asda</div>
        <div>Asda</div>
        <div>Asda</div>
        <div>Asda</div>
      </ToolBar>
    </div>
  );
};

export default Sorting;
