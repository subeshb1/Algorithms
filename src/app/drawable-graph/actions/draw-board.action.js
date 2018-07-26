import {
  getGraph,
  getDrawableMode,
  getDrawableAction,
  getToolsState,
  getDrawBoardState
} from "../reducers";
const sortList = data => async (dispatch, getState) => {
  let i = 0;
  let action = { type: "NULL" };
  const {
    draw: {
      list: { graph, row, col, displayText }
    }
  } = getGraph(getState());
  for (let item of data) {
    const {
      tool: { step, interval },
      draw: { searching }
    } = getGraph(getState());
    if (!searching) return;
    if (!item.path) {
      graph[item.pos].color = item.color;
      if (item.text) graph[item.pos].text = item.text;
      action = {
        type: "DRAWABLE_LIST_ACTION",
        payload: { graph, row, col, displayText }
      };
    } else {
      action = {
        type: "DRAWABLE_LIST_ACTION",
        payload: { graph, row, col, path: item.path, displayText }
      };
    }

    if (i % step === 0 || !step) {
      // eslint-disable-next-line
      await new Promise(resolve =>
        setTimeout(() => {
          const {
            draw: { searching }
          } = getGraph(getState());
          if (!searching) return;
          dispatch(action);
          resolve();
        }, interval)
      );
      i = 0;
    }

    i++;
  }
  dispatch(action);
  dispatch({ type: "DRAWABLE_FINISHED" });
};

export const generateList = () => (dispatch, getState) => {
  return;
  dispatch({
    type: "DRAWABLE_LIST_GENERATE",
    payload: "/workers/generate-graph.js"
  });
  const {
    draw: {
      worker,
      list: { displayText }
    },
    tool: { row, col, start, end }
  } = getGraph(getState());
  worker.onmessage = e => {
    dispatch({
      type: "DRAWABLE_LIST_GENERATED",
      payload: e.data
    });
  };
  worker.postMessage([row, col, start, end, displayText]);
};
export const processList = algo => (dispatch, getState) => {
  dispatch({ type: "DRAWABLE_LIST_WHITE" });
  dispatch({
    type: "DRAWABLE_LIST_PROCESS",
    payload: "/workers/graph-search.js"
  });
  const {
    draw: { worker, list },
    tool: { start, end, diagonal }
  } = getGraph(getState());
  worker.onmessage = e => {
    dispatch({ type: "DRAWABLE_LIST_PROCESSED" });
    dispatch(sortList(e.data));
  };
  worker.postMessage([algo, list, start, end, diagonal]);
};

export const cancel = () => ({ type: "DRAWABLE_CANCELLED" });

export const makeBlock = (i, mode = 0) => (dispatch, getState) => {
  if (!getGraph(getState()).draw.searching) {
    dispatch({
      type: "DRAWABLE_LIST_BLOCK",
      payload: i,
      mode
    });
  }
};

export const onRelease = i => ({ type: "DRAWABLE_RELEASE" });
export const onPress = i => ({ type: "DRAWABLE_PRESS" });

export const clearColor = i => ({ type: "DRAWABLE_LIST_WHITE" });

export const changeDisplayText = payload => ({
  type: "DRAWABLE_LIST_TEXT",
  payload
});

// New
const getOffset = e => {
  const { left: x, top: y } = e.currentTarget.getBoundingClientRect();
  let offsetX;
  let offsetY;
  if (e.clientX !== undefined) {
    offsetX = e.clientX - x;
    offsetY = e.clientY - y;
  } else {
    offsetX = e.touches[0].clientX - x;
    offsetY = e.touches[0].clientY - y;
  }
  return { x: Math.max(0, offsetX), y: Math.max(offsetY, 0) };
};
export const onNodeAdd = e => dispatch => {
  if (e.currentTarget === e.target) {
    dispatch({
      type: "DRAWABLE_LIST_ADD_NODE",
      payload: getOffset(e)
    });
  }
};

export const onNodePress = key => (dispatch, getState) => {
  const state = getState();
  const mode = getDrawableMode(state);
  if (mode === 1) return;
  const { selected, temp } = getDrawableAction(state);
  if (mode === 0) {
    dispatch({
      type: "DRAWABLE_DRAG_ITEM",
      payload: true
    });
    if ((selected && selected.item !== key) || !selected) {
      dispatch({
        type: "DRAWABLE_SELECT_ITEM",
        name: "NODE",
        item: key
      });
    }
  } else if (mode === 2) {
    const {
      list: { arc }
    } = getDrawBoardState(state);
    if (temp !== undefined) {
      let k1 = [temp, key].sort().join("");
      if (temp !== key && arc[k1] === undefined)
        dispatch({
          type: "DRAWABLE_LIST_ADD_ARC",
          payload: {
            from: temp,
            to: key
          },
          key: k1
        });
      dispatch({
        type: "DRAWABLE_ACTION_RESET"
      });
    } else {
      dispatch({
        type: "DRAWABLE_ARC_ITEM",
        payload: key
      });
    }
  }
};
export const onNodeRelease = key => (dispatch, getState) => {
  const state = getState();
  const mode = getDrawableMode(state);
  if (mode === 1 || mode === 2) return;
  const { isDrag } = getDrawableAction(state);
  if (isDrag)
    dispatch({
      type: "DRAWABLE_DRAG_ITEM",
      payload: false
    });
};
export const onSVGDown = e => (dispatch, getState) => {
  const state = getState();
  const mode = getDrawableMode(state);
  const { isDrag } = getDrawableAction(state);
  if (mode === 1) {
    return onNodeAdd(e)(dispatch, getState);
  } else if (e.currentTarget === e.target)
    dispatch({
      type: "DRAWABLE_ACTION_RESET"
    });
};

export const onNodeMove = e => (dispatch, getState) => {
  const state = getState();
  const mode = getDrawableMode(state);
  if (mode === 1 || mode === 2) return;
  const { isDrag, selected } = getDrawableAction(state);
  if (isDrag)
    dispatch({
      type: "DRAWABLE_LIST_ADD_NODE",
      key: selected.item,
      payload: getOffset(e)
    });
};
