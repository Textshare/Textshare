import { httpGet, httpPost, httpPut, httpDelete } from "utils"
import UUID from "uuid-js"

function initialDocumentState() {
  const rowUuid = UUID.create().hex
  return { title: "New document", content: "", row_ids: [rowUuid] }
}

export function addDocument() { return (dispatch) => {
  httpPost("/api/v1/documents", { document: initialDocumentState() })
    .then(function(data) {
      dispatch({ type: "RESPONSE_DOCUMENT", data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function getDocument(documentId) { return (dispatch) => {
  httpGet("/api/v1/documents/" + documentId)
    .then(function(data) {
      dispatch({ type: "RESPONSE_DOCUMENT", data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function updateDocument(documentId) { return (dispatch, getState) => {
  const document = getState().documents[documentId]
  httpPut("/api/v1/documents/" + documentId, {
    title: document.title, content: document.content, row_ids: document.row_ids
  })
    .then(function(data) {
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
