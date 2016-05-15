import UUID from "uuid-js"

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
  // arrows
  if ([37, 38, 39, 40].includes(event.keyCode)) {
    editor.setCursorPosition(window.getSelection().anchorOffset)
  }
  // enter
  if (event.keyCode === 13) {
    editor.setFocusedRow(event.newRowId)
  }
}

function keyDownHandler(event, rowId, editor) {
  // right/down arrows
  if ([39, 40].includes(event.keyCode)) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (cursorShouldJumpToNextLine(currentRowIndex, editor)) {
      event.preventDefault()
      editor.setCursorPosition(0)
      editor.setFocusedRow(editor.rows[currentRowIndex + 1].id)
    }
  }
  // left/up arrows
  if ([37, 38].includes(event.keyCode)) {
    let currentRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (cursorShouldJumpToPreviousLine(currentRowIndex, editor)) {
      event.preventDefault()
      editor.setCursorPosition(editor.rows[currentRowIndex - 1].text.length)
      editor.setFocusedRow(editor.rows[currentRowIndex - 1].id)
    }
  }
  // backspace
  if (event.keyCode === 8) {
    if (editor.rows.length > 0 && editor.rows[0].id !== editor.focusedRowId &&
    window.getSelection().anchorOffset === 0) {
      event.preventDefault()
      let focusedRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
      let previousRow = editor.rows[focusedRowIndex - 1]
      editor.setRowText(previousRow.id, previousRow.text + editor.rows[focusedRowIndex].text)
      editor.setFocusedRow(previousRow.id)
      editor.setCursorPosition(previousRow.text.length)
      editor.removeRow(rowId)
    }
  }
  // delete
  if (event.keyCode === 46) {
    let focusedRowIndex = editor.rows.findIndex((row) => { return row.id === rowId })
    if (editor.rows.length > 0 && focusedRowIndex !== editor.rows.length - 1 &&
    window.getSelection().anchorOffset === editor.rows[focusedRowIndex].text.length) {
      event.preventDefault()
      let nextRow = editor.rows[focusedRowIndex + 1]
      editor.setRowText(rowId, editor.rows[focusedRowIndex].text + nextRow.text)
      editor.removeRow(nextRow.id)
    }
  }
  // enter
  if (event.keyCode === 13) {
    event.preventDefault()
    let focusedRow = editor.rows.find((row) => { return row.id === editor.focusedRowId })
    let uuid = UUID.create().hex
    editor.addRow(uuid, editor.focusedRowId)
    editor.setRowText(uuid, focusedRow.text.slice(editor.cursorPosition, focusedRow.text.length))
    editor.setRowText(editor.focusedRowId, focusedRow.text.slice(0, editor.cursorPosition))
    editor.setCursorPosition(0)
    event.newRowId = uuid
  }
}

function onPasteHandler(event, rowId, editor) {
  if (event.clipboardData.types.includes("text/html")) {
    event.preventDefault()
    let unsanitizedHtml = event.clipboardData.getData("text/html")
    let temporaryElement = document.createElement("div")
    temporaryElement.innerHTML = unsanitizedHtml
    editor.pasteTextToRow(rowId, temporaryElement.innerText)
  }
}

export { keyDownHandler, keyUpHandler, onPasteHandler }
