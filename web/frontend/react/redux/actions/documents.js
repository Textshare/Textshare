import { httpGet, httpPost, httpDelete } from "utils"

const initialDocumentState = { title: "New document", content: { rowOrder: [], rows: {} } }

export function addDocument() { return (dispatch) => {
  httpPost("/api/v1/documents", { document: initialDocumentState })
    .then(function(data) {
      dispatch({ type: "RESPONSE_DOCUMENT", data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function removeDocument(doc) { return (dispatch) => {
  httpDelete("/api/v1/documents/" + doc.id)
    .then(function(data) {
      dispatch({ type: "REMOVED_DOCUMENT", data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function fetchDocuments() { return (dispatch) => {
  httpGet("/api/v1/documents")
    .then(function(data) {
      dispatch({ type: "RESPONSE_DOCUMENTS", data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
} }
