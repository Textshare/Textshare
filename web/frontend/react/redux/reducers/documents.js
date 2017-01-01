import { combineReducers } from "redux"
import moment from "moment"

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

    case "SET_LIMIT": {
      const newDocument = Object.assign({}, state[action.documentId], { limit: action.limit })
      return Object.assign({}, state, { [action.documentId]: newDocument })
    }

    case "RESPONSE_DOCUMENT": {
      if (action.data.content === null) action.data.content = "";
      const newDocument = Object.assign({}, state[action.data.id] || {}, action.data)
      return Object.assign({}, state, { [action.data.id]: newDocument })
    }

    case "RESPONSE_DOCUMENTS": {
      state = initialState
      const normalizedDocuments = action.data.reduce((acc, doc) => {
        if (doc.content === null) doc.content = "";
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

    case "SET_SORTING": {
      const documents = Object.keys(state).map((key) => state[key])

      const deep_value = (obj, path) => {
        for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
          obj = obj[path[i]];
        };
        return obj;
      }

      const comparator = (doc1, doc2, type) => {
        if (type === "inserted_at" || type === "updated_at") {
          moment(doc1[type]).isBefore(moment(doc2[type]))
        } else {
          deep_value(doc1, action.sorting.type) > deep_value(doc1, action.sorting.type)
        }
      }

      const newDocuments =
        documents.sort((doc1, doc2) => {
          return action.sorting.direction * (comparator(doc1, doc2, action.sorting.type) ? 1 : -1)
        })
        .map((document, index) => Object.assign({}, document, { order: index }))
        .reduce((acc, doc) => {
          return Object.assign(acc, { [doc.id]: doc })
        }, {})

      return Object.assign({}, state, newDocuments)
    }

    case "SET_SEARCH_TEXT": {
      const documents = Object.keys(state).map((key) => state[key])

      const filterByTitleAndTags = (document) => {
        let textContains = (text1, text2) => {
          return text1.toLowerCase().indexOf(text2.toLowerCase()) > -1
        }
        let tagNames = document.tags.map((tag) => { return tag.name });
        return [document.title].concat(tagNames).some((text) => {
          return textContains(text, action.text);
        })
      }

      const newDocuments =
        documents
          .map((document) => Object.assign({}, document, { hide: !filterByTitleAndTags(document) }))
          .reduce((acc, doc) => {
            if (doc.content === null) doc.content = "";
            return Object.assign(acc, { [doc.id]: doc })
          }, {})

      return Object.assign({}, state, newDocuments)
    }

    default:
      return state
  }
}
