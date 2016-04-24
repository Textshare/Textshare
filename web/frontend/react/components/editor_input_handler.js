function keyUpHandler(event, rowId, editor) {
  // arrow keys
  if ([37, 38, 39, 40].includes(event.keyCode)) {
    editor.setCursorPosition(window.getSelection().anchorOffset)
  }
}

function keyDownHandler(event, rowId, editor) {

}

function onClickHandler(event, rowId, editor) {
  editor.setCursorPosition(window.getSelection().anchorOffset)
  editor.setFocusedRow(rowId)
}

export { keyDownHandler, keyUpHandler, onClickHandler }
