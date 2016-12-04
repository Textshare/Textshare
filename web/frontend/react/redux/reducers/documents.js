import { combineReducers } from "redux"

const initialState = {}

export default function documentsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TITLE": {
      const newDocument = Object.assign({}, state[action.documentId], { title: action.title })
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "SET_CONTENT": {
      const newDocument = Object.assign({}, state[action.documentId], { content: action.content })
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "SET_ROW_IDS": {
      const newDocument = Object.assign({}, state[action.documentId], { row_ids: action.rowIds })
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

    case "RESPONSE_COLLABORATORS": {
      const newDocument = Object.assign({},
        state[action.documentId],
        { collaboratorsIds: action.data.map((collaborator) => { return collaborator.id }) }
      )
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "RESPONSE_POSSIBLE_COLLABORATORS": {
      const newDocument = Object.assign({},
        state[action.documentId],
        { possibleCollaboratorsIds: action.data.map((collaborator) => { return collaborator.id }) }
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

    case "SET_CUR_POS": {
        const newDocument = Object.assign({}, state[action.documentId], { line: action.line, ch: action.ch })
        return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    default:
      return state
  }
}
