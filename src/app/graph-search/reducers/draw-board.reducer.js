import { combineReducers } from "redux";

const drawReducer = (
  state = {
    finished: false,
    swap: [],
    pivot: -1,
    boundary: []
  },
  action
) => {
  switch (action.type) {
    case "LIST_ACTION":
      const { pivot, boundary, swap, finished } = action;
      return { ...state, pivot, boundary, swap, finished };
    case "FINISHED":
      return {
        ...state,
        finished: true,
        swap: [],
        pivot: -1,
        boundary: []
      };
    case "CANCELLED":
    case "LIST_GENERATE":
      return {
        ...state,
        finished: false,
        swap: [],
        pivot: -1,
        boundary: []
      };
    default:
      return state;
  }
};
const isLoading = (state = false, action) => {
  switch (action.type) {
    case "GRAPH_LIST_GENERATE":
    case "GRAPH_LIST_PROCESS":
      return true;
    case "GRAPH_LIST_GENERATED":
    case "GRAPH_LIST_PROCESSED":
      return false;
    case "GRAPH_CANCELLED":
      return false;
    default:
      return state;
  }
};
const isSearching = (state = false, action) => {
  switch (action.type) {
    case "GRAPH_LIST_PROCESSED":
      return true;
    case "GRAPH_CANCELLED":
    case "GRAPH_FINISHED":
      return false;
    default:
      return state;
  }
};
const listReducer = (state = { graph: [], row: 0, col: 0 }, action) => {
  switch (action.type) {
    case "GRAPH_LIST_GENERATED":
    case "GRAPH_LIST_ACTION":
      return action.payload;
    case "GRAPH_LIST_WHITE":
      return {
        ...state,
        graph: state.graph.map(x => {
          if (x.color !== "white" && x.color !== "black") x.color = "white";
          return x;
        })
      };
    case "GRAPH_CLEAR":
      return { graph: [], row: 0, col: 0 };
    case "GRAPH_LIST_BLOCK":
      const { graph } = state;
      if (!action.mode)
        graph[action.payload].color =
          graph[action.payload].color === "black" ? "white" : "black";
      else graph[action.payload].color = "black";
      return {
        ...state,
        graph
      };
    default:
      return state;
  }
};
export const isNew = (state = true, action) => {
  switch (action.type) {
    case "GRAPH_GENERATED":
      return true;
    case "GRAPH_FINISHED":
    case "GRAPH_CANCELLED":
      return false;
    default:
      return state;
  }
};
export const workerReducer = (state = null, action) => {
  switch (action.type) {
    case "GRAPH_LIST_GENERATE":
    case "GRAPH_LIST_PROCESS":
      return new Worker(action.payload);
    case "GRAPH_LIST_GENERATED":
    case "GRAPH_LIST_PROCESSED":
    case "GRAPH_CANCELLED":
      if (state) state.terminate();
      return null;
    default:
      return state;
  }
};

export const isPressed = (state = false, action) => {
  switch (action.type) {
    case "GRAPH_PRESS":
      return true;
    case "GRAPH_RELEASE":
      return false;
    default:
      return state;
  }
};
export default combineReducers({
  loading: isLoading,
  searching: isSearching,
  state: drawReducer,
  worker: workerReducer,
  list: listReducer,
  new: isNew,
  pressed: isPressed
});

export const getGraph = s => s.graph;
export const getDrawBoardState = state => {
  return state.graph.draw;
};

export const getItemAt = (s, i) => s.graph.draw.list.graph[i];
