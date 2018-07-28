import { combineReducers } from "redux";

let nodeKey = 0;
let arcKey = 0;

const isLoading = (state = false, action) => {
  switch (action.type) {
    case "DRAWABLE_LIST_PROCESS":
      return true;
    case "DRAWABLE_LIST_PROCESSED":
      return false;
    case "DRAWABLE_CANCELLED":
      return false;
    default:
      return state;
  }
};

const isSearching = (state = false, action) => {
  switch (action.type) {
    case "DRAWABLE_LIST_PROCESSED":
      return true;
    case "DRAWABLE_CANCELLED":
    case "DRAWABLE_FINISHED":
      return false;
    default:
      return state;
  }
};

const listReducer = (
  state = {
    node: {},
    arc: {},
    start: undefined,
    end: undefined
  },
  action
) => {
  switch (action.type) {
    case "DRAWABLE_LIST_ACTION":
      return action.payload;
    case "DRAWABLE_LIST_ADD_ARC":
      let akey = action.key !== undefined ? action.key : arcKey++;
      return {
        ...state,
        arc: { ...state.arc, [akey]: { ...action.payload, key: akey } }
      };
    case "DRAWABLE_LIST_ADD_NODE":
      let nkey = action.key !== undefined ? action.key : nodeKey++;
      return {
        ...state,
        node: {
          ...state.node,
          [nkey]: { ...action.payload, key: nkey, color: "UNVISITED" }
        }
      };
    case "DRAWABLE_LIST_START":
      return {
        ...state,
        start: action.payload
      };
    case "DRAWABLE_LIST_END":
      return {
        ...state,
        end: action.payload
      };
    case "DRAWABLE_CLEAR":
      return {
        node: {},
        arc: {},
        start: undefined,
        end: undefined
      };
    default:
      return state;
  }
};

export const isNew = (state = true, action) => {
  switch (action.type) {
    case "DRAWABLE_GENERATED":
      return true;
    case "DRAWABLE_FINISHED":
    case "DRAWABLE_CANCELLED":
      return false;
    default:
      return state;
  }
};

export const workerReducer = (state = null, action) => {
  switch (action.type) {
    case "DRAWABLE_LIST_PROCESS":
      return new Worker(action.payload);
    case "DRAWABLE_LIST_GENERATED":
    case "DRAWABLE_LIST_PROCESSED":
    case "DRAWABLE_CANCELLED":
      if (state) state.terminate();
      return null;
    default:
      return state;
  }
};

export const isPressed = (state = false, action) => {
  switch (action.type) {
    case "DRAWABLE_PRESS":
      return true;
    case "DRAWABLE_RELEASE":
      return false;
    default:
      return state;
  }
};

const actionReducer = (
  state = { selected: undefined, temp: undefined, isDrag: false },
  action
) => {
  switch (action.type) {
    case "DRAWABLE_SELECT_ITEM":
      return { ...state, selected: { item: action.item, type: action.name } };
    case "DRAWABLE_DRAG_ITEM":
      return { ...state, isDrag: action.payload };
    case "DRAWABLE_ARC_ITEM":
      return { ...state, temp: action.payload };

    case "DRAWABLE_CHANGE_MODE":
    case "DRAWABLE_ACTION_RESET":
    case "DRAWABLE_CLEAR":
      return { selected: undefined, temp: undefined, isDrag: false };
    default:
      return state;
  }
};

export default combineReducers({
  loading: isLoading,
  searching: isSearching,
  worker: workerReducer,
  list: listReducer,
  new: isNew,
  pressed: isPressed,
  action: actionReducer
});

export const getDrawable = s => s.drawable;
export const getDrawBoardState = state => {
  return state.drawable.draw;
};
export const getDrawBoardList = s => getDrawBoardState(s).list;
export const getItemAt = (s, i) => s.graph.draw.list.graph[i];
export const getDrawableAction = s => s.drawable.draw.action;
