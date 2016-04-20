const initialState = {
  rowOrder: [1, 2, 3, 4],
  rows: {
    1: { id: 1, text: "" },
    2: { id: 2, text: "" },
    4: { id: 4, text: "" },
    3: { id: 3, text: "" }
  }
}

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ROW_TEXT":
      const newRow = Object.assign({}, state.rows[action.rowId], { text: action.text })
      const newRows = Object.assign({}, state.rows, { [action.rowId]: newRow })
      return Object.assign({}, state, { rows: newRows })
    default:
      return state
  }
}
