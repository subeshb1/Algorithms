import { sorting } from "./reducers";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const configureStore = () => {
  const store = createStore(sorting, applyMiddleware(thunk, createLogger()));

  return store;
};

export default configureStore;
