const EditorActions = {
  setRowText: (rowId, text) => {
    return { type: "SET_ROW_TEXT", rowId: rowId, text: text }
  }
}

export default EditorActions
