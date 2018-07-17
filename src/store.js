import { sorting } from "./reducers";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const configureStore = () => {
  const store = createStore(
    sorting,
    applyMiddleware(thunk)
  );

  return store;
};

export default configureStore;
