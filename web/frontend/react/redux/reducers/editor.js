import { combineReducers } from "redux"

const initialState = {
  focusedRowId: null,
  cursorPosition: 0
}

export default combineReducers({
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
