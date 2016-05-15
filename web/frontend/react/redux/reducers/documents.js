import { combineReducers } from "redux"

const initialState = {}

function initialDocumentState(uuid) {
  return { title: "New document", content: { rowOrder: [], rows: {} } }
}

export default function documentsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
