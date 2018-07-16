import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { DrawBoard, ToolBar, MenuBar } from "../../components/ui";
import { itemGenerator } from "../../components/utils";
import { changeSize } from "../../actions/sorting";
import { connect } from "react-redux";

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
const Menu = itemGenerator("div", NavLink, "Menu");

let menuItems = links.map(item => ({
  className: "item",
  children: getName(item),
  to: item
}));

const Loader = (
  <div className="logo">
    <img src="/logo.svg" alt="" />
  </div>
);

const Draw = <div className="drawboard" />;
const DrawB = ({
  listLoading,
  listProcessing,
  size,
  finished,
  swap,
  pivot,
  boundary,
  list
}) => {
  return (
    <div className="drawboard">
      {(listLoading || listProcessing) && (
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>
      )}
      <svg preserveAspectRatio="none" viewBox={`0 0 ${size}0 ${size}0`}>
        {list.map((x, i) => (
          <rect
            {...x}
            x={i * 10}
            width="10"
            key={i}
            fill={
              finished
                ? "green"
                : swap.includes(i)
                  ? "green"
                  : pivot === i
                    ? "blue"
                    : boundary.includes(i)
                      ? "red"
                      : "black"
            }
            // stroke="black"
          />
        ))}
      </svg>
    </div>
  );
};

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = this.props;

    this.state = {
      list: [],
      size: 100,
      mode: 3,
      listLoading: true,
      value: 100,
      pivot: -1,
      listProcessing: false,
      sorting: false,
      step: 1,
      interval: 10,
      boundary: [],
      swap: [],
      pathname,
      finished: false
    };
    this.worker = undefined;
  }

  createWorker = name => {
    if (this.worker) this.worker.terminate();
    this.worker = new Worker(name);
  };
  terminateWorker = () => {
    if (this.worker) this.worker.terminate();
    this.worker = undefined;
  };

  stop = (extra = {}) => {
    this.terminateWorker();
    this.reset(extra);
  };

  reset = (extra = {}) => {
    this.setState({
      listLoading: false,
      pivot: -1,
      listProcessing: false,
      sorting: false,
      boundary: [],
      swap: [],
      finished: false,
      ...extra
    });
  };

  shouldComponentUpdate = ({ location: { pathname } }) => {
    if (this.state.pathname !== pathname) {
      this.stop({ pathname });
    }
    return true;
  };
  componentDidMount = () => {
    const { size, mode } = this.state;
    this.generateList(size, mode);
  };
  sort = () => {
    this.createWorker("/workers/algo.js");
    this.worker.onmessage = e => {
      this.terminateWorker();
      this.setState({ sorting: true, listProcessing: false }, () => {
        console.log(e.data);
        this.animate(e.data);
      });
    };
    this.setState({ listProcessing: true, finished: false }, () => {
      this.worker.postMessage([
        getAlgoFromPath(this.state.pathname),
        this.state.list
      ]);
    });
  };

  generateList = (size, mode) => {
    this.setState({ listLoading: true, finished: false }, () => {
      this.createWorker("/workers/generate.js");
      this.worker.postMessage([size, mode]);
      this.worker.onmessage = e => {
        this.terminateWorker();
        this.setState({ list: e.data, listLoading: false, size, mode });
      };
    });
  };

  animate = async actions => {
    let list = [...this.state.list];
    let i = 0;
    for (let item of actions) {
      switch (item.type) {
        case "LIST_STORE":
          list[item.payload.i] = item.payload.val;
          break;
        case "LIST_SWAP":
          const temp = list[item.payload.pos[0]];
          list[item.payload.pos[0]] = list[item.payload.pos[1]];
          list[item.payload.pos[1]] = temp;
          break;
        default:
          break;
      }

      if (!this.state.sorting) return;
      if (i % this.state.step === 0 || !this.state.step) {
        await new Promise(resolve =>
          setTimeout(() => {
            if (!this.state.sorting) return;
            this.setState(
              {
                list: [...list],
                pivot: item.payload.pivot,
                boundary: item.payload.boundary || [],
                swap: item.payload.pos || []
              },
              () => resolve()
            );
          }, this.state.interval)
        );
        i = 0;
      }

      i++;
    }
    this.setState({
      list,
      pivot: -1,
      sorting: false,
      boundary: [],
      swap: [],
      finished: true
    });
  };

  updateSize = (mode = 1) => {
    if (
      (!this.state.listLoading && this.state.value !== this.state.size) ||
      mode === 1
    )
      this.generateList(
        Math.min(this.state.value || 1, getMaxValue(this.state.pathname)),
        this.state.mode
      );
  };

  render() {
    const {
      list,
      size,
      listLoading,
      sorting,
      swap,
      listProcessing,
      pivot,
      boundary,
      pathname,
      finished
    } = this.state;
    const algo = getAlgoFromPath(pathname)
      .split("-")
      .map(x => x.toUpperCase())
      .join(" ");
    return (
      <div className="sorting">
        <Menu items={menuItems} className="menu" />

        <DrawB
          {...{
            listLoading,
            listProcessing,
            size,
            finished,
            swap,
            pivot,
            boundary,
            list
          }}
        />

        <ToolBar>
          <h2>{algo}</h2>
          <label>
            No of Items
            <input
              type="number"
              step="1"
              min="0"
              max="10000"
              value={this.state.value}
              onChange={e => {
                this.setState({
                  value: Math.min(
                    parseInt(e.target.value, 10) || "",
                    getMaxValue(pathname)
                  )
                });
              }}
              onBlur={() => {
                this.updateSize();
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) this.updateSize(1);
              }}
              disabled={listLoading || listProcessing || sorting}
            />
          </label>
          <label>
            {" "}
            Generate Items
            <select
              onChange={e =>
                this.generateList(this.state.size, parseInt(e.target.value, 10))
              }
              disabled={listLoading || listProcessing || sorting}
            >
              <option value="3">Random</option>
              <option value="1">Ascending</option>
              <option value="2">Descending</option>
            </select>
          </label>
          <label>
            Step<input
              type="number"
              value={this.state.step}
              onChange={e => {
                this.setState({ step: parseInt(e.target.value, 10) || 1 });
              }}
              step="1"
              min="1"
              max="1000"
            />
          </label>
          <label>
            Interval<input
              type="number"
              value={this.state.interval}
              onChange={e => {
                this.setState({ interval: parseInt(e.target.value, 10) || 1 });
              }}
              step="1"
              min="1"
              max="10000"
            />
          </label>
          <div className="btn-group">
            <button
              onMouseMove={x => this.props.changeSize(999)}
              onClick={this.sort}
              disabled={listLoading || listProcessing || sorting}
              className="green"
            >
              Sort
            </button>
            <button
              onClick={() => this.stop()}
              disabled={!sorting && !listProcessing}
              className="red"
            >
              Stop
            </button>
          </div>
        </ToolBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tool: state
});

const mapDispatchToProps = {
  changeSize
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sorting);
