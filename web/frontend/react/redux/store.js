import { createStore as _createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { routerReducer } from "react-router-redux"
import DevTools from "components/DevTools"

export default function createStore() {
  const middleware = [thunkMiddleware]
  const reducer = combineReducers({
    routing: routerReducer
  })
  const enhancer = compose(applyMiddleware(...middleware), DevTools.instrument())

  const store = _createStore(reducer, enhancer)

  return store
}