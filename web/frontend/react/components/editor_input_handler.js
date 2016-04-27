function cursorShouldJumpToNextLine(currentRowIndex, editor) {
  return window.getSelection().anchorOffset === editor.rows[currentRowIndex].text.length &&
    currentRowIndex + 1 < editor.rows.length
}

function cursorShouldJumpToPreviousLine(currentRowIndex, editor) {
  return window.getSelection().anchorOffset === 0 && currentRowIndex > 0
}

function cursorPositionAfterJump(desiredPosition, row) {
  return row.text.length > desiredPosition ? desiredPosition : row.text.length
}

function keyUpHandler(event, rowId, editor) {
  // down arrow
  if (event.keyCode === 40) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (cursorShouldJumpToNextLine(currentRowIndex, editor)) {
      let nextRow = editor.rows[currentRowIndex + 1]
      let newCursorPosition = cursorPositionAfterJump(event.previousCursorPosition, nextRow)
      editor.setCursorPosition(newCursorPosition)
      editor.setFocusedRow(nextRow.id)
    } else {
      editor.setCursorPosition(window.getSelection().anchorOffset)
    }
  }
  // up arrow
  if (event.keyCode === 38) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (cursorShouldJumpToPreviousLine(currentRowIndex, editor)) {
      let previousRow = editor.rows[currentRowIndex - 1]
      let newCursorPosition = cursorPositionAfterJump(event.previousCursorPosition, previousRow)
      editor.setCursorPosition(newCursorPosition)
      editor.setFocusedRow(previousRow.id)
    } else {
      editor.setCursorPosition(window.getSelection().anchorOffset)
    }
  }
  // left/right arrows
  if ([37, 39].includes(event.keyCode)) {
    editor.setCursorPosition(window.getSelection().anchorOffset)
  }
}

function keyDownHandler(event, rowId, editor) {
  // right arrow
  if (event.keyCode === 39) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (cursorShouldJumpToNextLine(currentRowIndex, editor)) {
      editor.setCursorPosition(0)
      editor.setFocusedRow(editor.rows[currentRowIndex + 1].id)
    }
  }
  // left arrow
  if (event.keyCode === 37) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (cursorShouldJumpToPreviousLine(currentRowIndex, editor)) {
      editor.setCursorPosition(editor.rows[currentRowIndex - 1].text.length)
      editor.setFocusedRow(editor.rows[currentRowIndex - 1].id)
    }
  }
  // up/down arrows
  if ([38, 40].includes(event.keyCode)) {
    event.previousCursorPosition = window.getSelection().anchorOffset
  }
}

function onClickHandler(event, rowId, editor) {
  editor.setCursorPosition(window.getSelection().anchorOffset)
  editor.setFocusedRow(rowId)
}

export { keyDownHandler, keyUpHandler, onClickHandler }
