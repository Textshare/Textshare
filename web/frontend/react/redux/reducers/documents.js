import { combineReducers } from "redux"

const initialState = {}

function initialDocumentState(uuid) {
  return { id: uuid, title: "New document", content: { rowOrder: [], rows: {} } }
}

function initialRowState(uuid) { return { id: uuid, text: "" } }

export default function documentsReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_DOCUMENT": {
  // TODO: don't use temporary uuid once we start creating CRUD after authentication is implemented
      return Object.assign({}, state, { [action.uuid]: initialDocumentState(action.uuid) })
    }

    case "SET_TITLE": {
      const newDocument = Object.assign({}, state[action.documentId], { title: action.title })
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "ADD_ROW": {
      const content = state[action.documentId].content
      const newDocumentRowOrder = (() => { if (action.afterRowId) {
        return content.rowOrder.reduce((acc, rowId) => {
          return acc.concat(action.afterRowId === rowId ? [rowId, action.uuid] : [rowId])
        }, [])
      } else {
        return [action.uuid].concat(content.rowOrder)
      } })()
      const newDocumentRows = Object.assign(
        {}, content.rows, { [action.uuid]: initialRowState(action.uuid) }
      )
      const newDocument = Object.assign({},
        state[action.documentId],
        { content: { rowOrder: newDocumentRowOrder, rows: newDocumentRows } }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "REMOVE_ROW": {
      const content = state[action.documentId].content
      const newDocumentRowOrder = content.rowOrder.filter((rowId) => {
        return rowId !== action.rowId
      })
      const newDocumentRows = Object.keys(content.rows).reduce((acc, rowId) => {
        return rowId === action.rowId ? acc :
          Object.assign({}, acc, { [rowId]: content.rows[rowId] })
      }, {})
      const newDocument = Object.assign({},
        state[action.documentId],
        { content: { rowOrder: newDocumentRowOrder, rows: newDocumentRows } }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "SET_ROW_TEXT": {
      const content = state[action.documentId].content
      const newRow = Object.assign({}, content.rows[action.rowId], { text: action.text })
      const newDocumentRows = Object.assign({}, content.rows, { [action.rowId]: newRow })
      const newDocument = Object.assign({},
        state[action.documentId],
        { content: { rowOrder: content.rowOrder, rows: newDocumentRows } }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    default:
      return state
  }
}
