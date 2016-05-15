export function setRowText(rowId, text) { return (dispatch) => {
  let newPosition = window.getSelection().anchorOffset
  dispatch({ type: "SET_ROW_TEXT", rowId: rowId, text: text })
  dispatch({ type: "SET_CURSOR_POSITION", position: newPosition })
} }

export function addRow(uuid, afterRowId) {
  return { type: "ADD_ROW", uuid: uuid, afterRowId: afterRowId }
}

export function removeRow(rowId) {
  return { type: "REMOVE_ROW", rowId: rowId }
}

export function pasteTextToRow(rowId, pastedText) { return (dispatch, getState) => {
  let editor = getState().editor
  let currentText = editor.rows[rowId].text
  let newText = currentText.slice(0, editor.cursorPosition) + pastedText +
    currentText.slice(editor.cursorPosition, currentText.length)
  let newPosition = editor.cursorPosition + pastedText.length
  dispatch({ type: "SET_ROW_TEXT", rowId: rowId, text: newText })
  dispatch({ type: "SET_CURSOR_POSITION", position: newPosition })
} }

export function setFocusedRow(rowId) {
  return { type: "SET_FOCUSED_ROW", rowId: rowId }
}

export function setCursorPosition(position) {
  return { type: "SET_CURSOR_POSITION", position: position }
}
