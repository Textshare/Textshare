import { createStore as _createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerReducer } from "react-router-redux";
import DevTools from "components/DevTools";
import registrationReducer from "./reducers/registration";
import sessionReducer from "./reducers/session";
import documentsReducer from "./reducers/documents";
import searchReducer from "./reducers/search";
import sortReducer from "./reducers/sort";
import tagsReducer from "./reducers/tags";
import collaboratorsReducer from "./reducers/collaborators";
import possibleCollaboratorsReducer from "./reducers/possibleCollaborators";


export default function createStore() {
  const middleware = [thunkMiddleware]
  const reducer = combineReducers({
    documents: documentsReducer,
    routing: routerReducer,
    registration: registrationReducer,
    session: sessionReducer,
    search: searchReducer,
    sort: sortReducer,
    tags: tagsReducer,
    collaborators: collaboratorsReducer,
    possibleCollaborators: possibleCollaboratorsReducer,
  })
  // const enhancer = compose(applyMiddleware(...middleware), DevTools.instrument());
  const enhancer = compose(applyMiddleware(...middleware));

  const store = _createStore(reducer, enhancer);

  return store;
}
