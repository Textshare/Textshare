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
      case "TO_DO":
        return state
      default:
        return state
    }
  },
  rows: function(state = initialState.rows, action) {
    switch (action.type) {
      case "SET_ROW_TEXT":
        const newRow = Object.assign({}, state[action.rowId], { text: action.text })
        return Object.assign({}, state, { [action.rowId]: newRow })
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
