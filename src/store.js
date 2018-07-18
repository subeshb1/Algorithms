import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
const configureStore = () => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk)
  );

  return store;
};

export default configureStore;
