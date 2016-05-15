export function setRowText(documentId, rowId, text) { return (dispatch) => {
  let newPosition = window.getSelection().anchorOffset
  dispatch({ type: "SET_ROW_TEXT", documentId: documentId, rowId: rowId, text: text })
  dispatch({ type: "SET_CURSOR_POSITION", position: newPosition })
} }

export function addRow(documentId, uuid, afterRowId) {
  return { type: "ADD_ROW", documentId: documentId, uuid: uuid, afterRowId: afterRowId }
}

export function removeRow(documentId, rowId) {
  return { type: "REMOVE_ROW", documentId: documentId, rowId: rowId }
}

export function pasteTextToRow(documentId, rowId, pastedText) { return (dispatch, getState) => {
  let state = getState()
  let editor = state.editor
  let content = state.documents[documentId].content
  let currentText = content.rows[rowId].text
  let newText = currentText.slice(0, editor.cursorPosition) + pastedText +
    currentText.slice(editor.cursorPosition, currentText.length)
  let newPosition = editor.cursorPosition + pastedText.length
  dispatch({ type: "SET_ROW_TEXT", documentId: documentId, rowId: rowId, text: newText })
  dispatch({ type: "SET_CURSOR_POSITION", position: newPosition })
} }

export function setFocusedRow(rowId) {
  return { type: "SET_FOCUSED_ROW", rowId: rowId }
}

export function setCursorPosition(position) {
  return { type: "SET_CURSOR_POSITION", position: position }
}
