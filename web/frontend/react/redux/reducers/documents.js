import { combineReducers } from "redux"

const initialState = {}

function initialDocumentState(uuid) {
  return { id: uuid, title: "New document", content: { rowOrder: [], rows: {} } }
}

function initialRowState(uuid) { return { id: uuid, text: "" } }

export default function documentsReducer(state = initialState, action) {
  switch (action.type) {
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

    case "RESPONSE_DOCUMENT": {
      const newDocument = Object.assign({}, state[action.data.id] || {}, action.data)
      return Object.assign({}, state, { [action.data.id]: newDocument })
    }

    case "RESPONSE_DOCUMENTS": {
      const normalizedDocuments = action.data.reduce((acc, doc) => {
        return Object.assign(acc, { [doc.id]: doc })
      }, {})
      return Object.assign({}, state, normalizedDocuments)
    }

    case "REMOVED_DOCUMENT": {
      return Object.keys(state).reduce((acc, documentId) => {
        return state[documentId].id === action.data.id ? acc :
          Object.assign({}, acc, { [documentId]: state[documentId] })
      }, {})
    }

    case "RESPONSE_TAGS": {
      const newDocument = Object.assign({},
        state[action.documentId],
        { tagIds: action.data.map((tag) => { return tag.id }) }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "RESPONSE_TAG": {
      const newDocument = Object.assign({},
        state[action.documentId],
        { tagIds: (state[action.documentId].tagIds || []).concat(action.tag.id) }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "REMOVE_TAG": {
      const newTagIds = state[action.documentId].tagIds.filter((tagId) => {
        return tagId !== action.tagId
      })
      const newDocument = Object.assign({},
        state[action.documentId], { tagIds: newTagIds }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    default:
      return state
  }
}
