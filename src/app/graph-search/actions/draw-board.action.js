import { getGraph } from "../reducers";
const sortList = data => async (dispatch, getState) => {
  let i = 0;
  const {
    draw: {
      list: { graph,row,col }
    }
  } = getGraph(getState());
  for (let item of data) {
    console.log();
    const {
      tool: { step, interval },
      draw: {
        searching,
        
      }
    } = getGraph(getState());
    // if (!searching) return;
    graph[item.pos].color = item.color;
    if (i % step === 0 || !step) {
      await new Promise(resolve =>
        setTimeout(() => {
          const {
            draw: { searching }
          } = getGraph(getState());
          // if (!searching) return;
          dispatch({
            type: "GRAPH_LIST_ACTION",
            payload: { graph, row, col }
          });
          resolve();
        }, interval)
      );
      i = 0;
    }

    i++;
  }
  dispatch({
    type: "GRAPH_LIST_ACTION",
    payload: { graph, row, col }
  });
  // dispatch({ type: "FINISHED", payload: [...list] });
};

export const generateList = () => (dispatch, getState) => {
  dispatch({
    type: "GRAPH_LIST_GENERATE",
    payload: "/workers/generate-graph.js"
  });
  const {
    draw: { worker },
    tool: { row, col, start, end }
  } = getGraph(getState());
  worker.onmessage = e => {
    console.log(e.data);
    dispatch({
      type: "GRAPH_LIST_GENERATED",
      payload: e.data
    });
  };
  worker.postMessage([row, col, start, end]);
};
export const processList = algo => (dispatch, getState) => {
  dispatch({ type: "GRAPH_LIST_PROCESS", payload: "/workers/graph-search.js" });
  const {
    draw: { worker, list },
    tool: { start, end }
  } = getGraph(getState());
  worker.onmessage = e => {
    dispatch({ type: "GRAPH_LIST_PROCESSED" });
    dispatch(sortList(e.data));
  };
  worker.postMessage([algo, list, start, end]);
};

export const cancel = () => ({ type: "GRAPH_CANCELLED" });
