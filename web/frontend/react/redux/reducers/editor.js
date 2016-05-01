import { combineReducers } from "redux"

const initialState = {
  rowOrder: [1, 2, 3, 4],
  rows: {
    1: { id: 1, text: "" },
    2: { id: 2, text: "" },
    4: { id: 4, text: "" },
    3: { id: 3, text: "" }
  },
  focusedRowId: null,
  cursorPosition: 0
}

export default combineReducers({
  rowOrder: function(state = initialState.rowOrder, action) {
    switch (action.type) {
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
