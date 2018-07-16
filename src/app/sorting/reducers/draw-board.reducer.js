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
    case "ACTION_TYPE":
      return state;
    default:
      return state;
  }
};
const isLoading = (state = false, action) => {
  switch (action.type) {
    case "LIST_GENERATE":
      return true;
    case "LIST_PROCESS":
      return true;
    case "LIST_GENERATED":
      return false;
    case "LIST_PROCESSED":
      return false;
    case "CANCELLED":
      return false;
    default:
      return state;
  }
};
const isSorting = (state = false, action) => {
  switch (action.type) {
    case "LIST_PROCESSED":
      return true;
    case "CANCELLED":
      return false;
    case "FINISHED":
      return false;
    default:
      return state;
  }
};
const listReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_GENERATED":
      return action.payload;
    default:
      return state;
  }
};

export const workerReducer = (state = null, action) => {
  switch (action.type) {
    case "LIST_GENERATE":
      return new Worker(action.payload);
    case "LIST_GENERATED":
      if (state) state.terminate();
      return null;
    default:
      return state;
  }
};
export default combineReducers({
  loading: isLoading,
  state: drawReducer,
  list: listReducer,
  sorting: isSorting,
  worker: workerReducer
});

export const getDrawBoardState = state => {
  console.log(state);
  return state.draw;
};
