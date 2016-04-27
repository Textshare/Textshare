const EditorActions = {
  setRowText: (rowId, text) => (dispatch) => {
    let newPosition = window.getSelection().anchorOffset
    dispatch({ type: "SET_ROW_TEXT", rowId: rowId, text: text })
    dispatch({ type: "SET_CURSOR_POSITION", position: newPosition })
  },
  pasteTextToRow: (rowId, pastedText) => (dispatch, getState) => {
    let editor = getState().editor
    let currentText = editor.rows[rowId].text
    let newText = currentText.slice(0, editor.cursorPosition) + pastedText +
      currentText.slice(editor.cursorPosition, currentText.length)
    let newPosition = editor.cursorPosition + pastedText.length
    dispatch({ type: "SET_ROW_TEXT", rowId: rowId, text: newText })
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
