import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { DrawBoard, ToolBar, MenuBar } from "../../components/ui";

class Sorting extends React.Component {
  state = {
    list: [],
    size: 10,
    mode: 3,
    listLoading: true,
    value: 10,
    pivot: -1,
    listProcessing: false,
    sorting: false,
    step: 1,
    interval: 10,
    boundary: []
  };
  componentDidMount = () => {
    const { size, mode } = this.state;
    this.generateList(size, mode);
  };
  sort = () => {
    const myWorker = new Worker("/algo/worker.js");

    myWorker.onmessage = e =>
      this.setState({ sorting: true, listProcessing: false }, () =>
        this.animate(e.data)
      );
    this.setState({ listProcessing: true }, () => {
      myWorker.postMessage(this.state.list);
    });
  };
  generateList = (size, mode) => {
    this.setState({ listLoading: true }, () => {
      const myWorker = new Worker("/algo/generate.js");
      myWorker.postMessage([size, mode]);
      myWorker.onmessage = e =>
        this.setState({ list: e.data, listLoading: false, size, mode });
    });
  };
  animate = async actions => {
    let list = [...this.state.list];
    let i = 0;
    for (let item of actions) {
      list[item.payload.i] = item.payload.val;
      if (!this.state.sorting) return;
      if (i % this.state.step == 0 || !this.state.step) {
        await new Promise(resolve =>
          setTimeout(() => {
            this.setState(
              {
                list: [...list],
                pivot: item.payload.i,
                boundary: item.payload.boundary,
              },
              () => resolve()
            );
          }, this.state.interval)
        );
        i = 0;
      }

      i++;
    }
    this.setState({ list, pivot: -1, sorting: false,boundary:[] });
  };
  render() {
    const {
      location: { pathname }
    } = this.props;
    const {
      list,
      size,
      listLoading,
      sorting,
      listProcessing,
      pivot,
      boundary
    } = this.state;

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
          {listLoading || listProcessing ? (
            <div className="logo">
              <img src="/logo.svg" />
            </div>
          ) : (
            ""
          )}
          <svg preserveAspectRatio="none" viewBox={`0 0 ${size}0 ${size}0`}>
            {list.map((x, i) => (
              <rect
                {...x}
                x={i * 10}
                width="10"
                fill={
                  pivot === i ? "blue" : boundary.includes(i) ? "red" : "black"
                }
              />
            ))}
          </svg>
        </DrawBoard>
        <ToolBar>
          <label>
            Name
            <input
              type="number"
              step="1"
              min="0"
              max="10000"
              value={this.state.value}
              onChange={e => {
                this.setState({ value: e.target.value });
              }}
              disabled={listLoading || listProcessing || sorting}
            />
          </label>
          <button
            onClick={() => {
              if (!listLoading)
                this.generateList(
                  Math.min(this.state.value, 10000),
                  this.state.mode
                );
            }}
            disabled={listLoading || listProcessing || sorting}
          >
            Enter
          </button>
          <select
            onChange={e =>
              this.generateList(this.state.size, parseInt(e.target.value))
            }
            disabled={listLoading || listProcessing || sorting}
          >
            <option value="3">Random</option>
            <option value="1">Ascending</option>
            <option value="2">Descending</option>
          </select>

          <label>
            Step<input
              type="number"
              value={this.state.step}
              onChange={e => {
                this.setState({ step: e.target.value });
              }}
              step="1"
              min="0"
              max="10000"
            />
          </label>
          <label>
            Interval<input
              type="number"
              value={this.state.interval}
              onChange={e => {
                this.setState({ interval: e.target.value });
              }}
              step="1"
              min="0"
              max="10000"
            />
          </label>
          <button
            onClick={this.sort}
            disabled={listLoading || listProcessing || sorting}
          >
            Sort
          </button>
        </ToolBar>
      </div>
    );
  }
}

export default Sorting;
