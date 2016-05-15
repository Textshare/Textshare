import { createStore as _createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { routerReducer } from "react-router-redux"
import DevTools from "components/DevTools"
import editorReducer from "./reducers/editor"

export default function createStore() {
  const middleware = [thunkMiddleware]
  const reducer = combineReducers({
    editor: editorReducer,
    routing: routerReducer
  })
  const enhancer = compose(applyMiddleware(...middleware), DevTools.instrument())

  const store = _createStore(reducer, enhancer)

  return store
}
