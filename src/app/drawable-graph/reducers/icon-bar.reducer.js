import { combineReducers } from "redux";

const modeReducer = (state = 0, action) => {
  switch (action.type) {
    case "DRAWABLE_CHANGE_MODE":
    console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export const getDrawableMode = state => state.drawable.icon.mode;
export default combineReducers({ mode: modeReducer });
