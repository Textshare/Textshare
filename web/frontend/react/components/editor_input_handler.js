function keyUpHandler(event, rowId, editor) {
  // arrow keys
  if ([37, 38, 39, 40].includes(event.keyCode)) {
    editor.setCursorPosition(window.getSelection().anchorOffset)
  }
}

function keyDownHandler(event, rowId, editor) {
  // right arrow
  if (event.keyCode === 39) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (window.getSelection().anchorOffset === editor.rows[currentRowIndex].text.length &&
    currentRowIndex + 1 < editor.rows.length) {
      editor.setCursorPosition(0)
      editor.setFocusedRow(editor.rows[currentRowIndex + 1].id)
    }
  }
  // left arrow
  if (event.keyCode === 37) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (window.getSelection().anchorOffset === 0 && currentRowIndex > 0) {
      editor.setCursorPosition(editor.rows[currentRowIndex - 1].text.length)
      editor.setFocusedRow(editor.rows[currentRowIndex - 1].id)
    }
  }
}

function onClickHandler(event, rowId, editor) {
  editor.setCursorPosition(window.getSelection().anchorOffset)
  editor.setFocusedRow(rowId)
}

export { keyDownHandler, keyUpHandler, onClickHandler }
