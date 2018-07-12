import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { DrawBoard, ToolBar, MenuBar } from "../../components/ui";

const generateList = (x, n) => {
  switch (n) {
    case 1:
      return new Array(x).fill(1).map((_, i) => ({
        height: (i + 1) * 10,
        x: i * 10,
        y: x * 10 - (i + 1) * 10,
        key: i
      }));
    case 2:
      return new Array(x).fill(1).map((_, i) => {
        const k = x - i - 1;
        return {
          height: (k + 1) * 10,
          x: i * 10,
          y: x * 10 - (k + 1) * 10,
          key: i
        };
      });
    case 3:
      let arr = new Array(x).fill(1).map((_, i) => i + 1);
      return new Array(x).fill(1).map((_, i) => {
        let item = Math.floor(Math.random() * arr.length);
        const [height] = arr.splice(item, 1);
        return {
          height: height * 10,
          x: i * 10,
          y: x * 10 - height * 10,
          key: i
        };
      });
    default:
      return [];
  }
};
class Sorting extends React.Component {
  state = {
    list: generateList(1000, 3),
    size: 1000
  };

  sort = () => {
    let myWorker = new Worker('/algo/worker.js');
   
    myWorker.onmessage = (m) => {
      console.log("msg from worker: ", m.data);
      myWorker.terminate();
    };
    myWorker.postMessage(this.state.list);
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    const { list, size } = this.state;

    const algo = pathname.slice(1);
    return (
      <div className="sorting">
        <MenuBar>
          <MenuBar.Item as={NavLink} to="/bubble-sort">
            Bubble Sort
          </MenuBar.Item>
          <MenuBar.Item as={NavLink} to="/quick-sort">
            Quick Sort
          </MenuBar.Item>
          <MenuBar.Item as={NavLink} to="/selection-sort">
            Selection Sort
          </MenuBar.Item>
          <MenuBar.Item as={NavLink} to="/merge-sort">
            Merge Sort
          </MenuBar.Item>
          <MenuBar.Item as={NavLink} to="/heap-sort">
            Heap Sort
          </MenuBar.Item>
        </MenuBar>
        <DrawBoard>
          <svg preserveAspectRatio="none" viewBox={`0 0 ${size}0 ${size}0`}>
            {list.map(x => <rect {...x} width="10" fill="black" />)}
          </svg>
        </DrawBoard>
        <ToolBar>
          <label>
            Name
            <input type="text" onClick={this.sort} />
          </label>
          <select name="" id="">
            <option value="">Random</option>
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </ToolBar>
      </div>
    );
  }
}

export default Sorting;
