export const toolBarReducer = (
  state = {
    size: 100,
    mode: 3,
    value: 100,
    step: 1,
    interval: 10
  },
  action
) => {
  switch (action.type) {
    case "TOOL_SIZE":
      return { ...state, size: action.payload };
    case "TOOL_MODE":
      return { ...state, mode: action.payload };
    case "TOOL_STEP":
      return { ...state, step: action.payload };
    case "TOOL_INTERVAL":
      return { ...state, interval: action.payload };
    default:
      return state;
  }
};
