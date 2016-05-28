import { createStore as _createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerReducer } from "react-router-redux";
import DevTools from "components/DevTools";
import registrationReducer from "./reducers/registration";
import sessionReducer from "./reducers/session";
import editorReducer from "./reducers/editor";
import documentsReducer from "./reducers/documents";
import searchReducer from "./reducers/search";

export default function createStore() {
  const middleware = [thunkMiddleware]
  const reducer = combineReducers({
    editor: editorReducer,
    documents: documentsReducer,
    routing: routerReducer,
    registration: registrationReducer,
    session: sessionReducer,
    search: searchReducer,
  })
  const enhancer = compose(applyMiddleware(...middleware), DevTools.instrument());

  const store = _createStore(reducer, enhancer);

  return store;
}
