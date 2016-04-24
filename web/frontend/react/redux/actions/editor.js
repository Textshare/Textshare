const EditorActions = {
  setRowText: (rowId, text) => (dispatch) => {
    let newPosition = window.getSelection().anchorOffset
    dispatch({ type: "SET_ROW_TEXT", rowId: rowId, text: text })
    dispatch({ type: "SET_CURSOR_POSITION", position: newPosition })
  },
  setFocusedRow: (rowId) => {
    return { type: "SET_FOCUSED_ROW", rowId: rowId }
  },
  setCursorPosition: (position) => {
    return { type: "SET_CURSOR_POSITION", position: position }
  }
}

export default EditorActions
