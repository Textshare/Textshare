import { combineReducers } from "redux"

const initialState = {
  rowOrder: [],
  rows: {},
  focusedRowId: null,
  cursorPosition: 0
}

function initialRowState(uuid) { return { id: uuid, text: "" } }

export default combineReducers({
  rowOrder: function(state = initialState.rowOrder, action) {
    switch (action.type) {
      case "ADD_ROW":
        if (action.afterRowId) {
          return state.reduce((acc, rowId) => {
            return acc.concat(action.afterRowId === rowId ? [rowId, action.uuid] : [rowId])
          }, [])
        } else {
          return [action.uuid].concat(state)
        }
      case "REMOVE_ROW":
        return state.filter((rowId) => rowId !== action.rowId)
      default:
        return state
    }
  },
  rows: function(state = initialState.rows, action) {
    switch (action.type) {
      case "SET_ROW_TEXT":
        const newRow = Object.assign({}, state[action.rowId], { text: action.text })
        return Object.assign({}, state, { [action.rowId]: newRow })
      case "ADD_ROW":
        return Object.assign({}, state, { [action.uuid]: initialRowState(action.uuid) })
      case "REMOVE_ROW":
        return Object.keys(state).reduce((acc, rowId) => {
          return rowId === action.rowId ? acc : Object.assign({}, acc, { [rowId]: state[rowId] })
        }, {})
      default:
        return state
    }
  },
  focusedRowId: function(state = initialState.focusedRowId, action) {
    switch (action.type) {
      case "SET_FOCUSED_ROW":
        return action.rowId
      default:
        return state
    }
  },
  cursorPosition: function(state = initialState.cursorPosition, action) {
    switch (action.type) {
      case "SET_CURSOR_POSITION":
        return action.position
      default:
        return state
    }
  }
})
