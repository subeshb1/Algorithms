export const changeStep = payload => ({
  type: "DRAWABLE_TOOL_STEP",
  payload
});
export const changeRow = payload => ({
  type: "DRAWABLE_TOOL_ROW",
  payload
});
export const changeColumn = payload => ({
  type: "DRAWABLE_TOOL_COLUMN",
  payload
});
export const changeInterval = payload => ({
  type: "DRAWABLE_TOOL_INTERVAL",
  payload
});
export const changeStart = payload => ({
  type: "DRAWABLE_TOOL_START",
  payload
});
export const changeEnd = payload => ({
  type: "DRAWABLE_TOOL_END",
  payload
});
export const changeDiagonal = payload => ({
  type: "DRAWABLE_TOOL_DIAGONAL",
  payload
});


export const clear = () => ({ type: "DRAWABLE_CLEAR" });
