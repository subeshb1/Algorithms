export const generateList = () => (dispatch, getState) => {
  dispatch({ type: "LIST_GENERATE", payload: "/workers/generate.js" });
  const {
    draw: { worker },
    tool: { size, mode }
  } = getState();
  const presentTime = Date.now();
  worker.onmessage = e => {
    dispatch({
      type: "LIST_GENERATED",
      payload: e.data
    });
    console.log(Date.now() - presentTime);
  };
  worker.postMessage([size, mode]);
};
