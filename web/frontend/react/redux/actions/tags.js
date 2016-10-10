import { httpGet, httpPost, httpPut, httpDelete } from "utils"

export function fetchTags(documentId) { return (dispatch) => {
  httpGet("/api/v1/documents/" + documentId + "/tags")
    .then(function(data) {
      dispatch({ type: "RESPONSE_TAGS", data: data, documentId: documentId})
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function addTag(documentId, tagName) { return (dispatch) => {
  httpPost("/api/v1/documents/" + documentId + "/tags", { tag: { name: tagName } })
    .then(function(data) {
      dispatch({ type: "RESPONSE_TAG", tag: data, documentId: documentId})
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function removeTag(documentId, tagId) { return (dispatch) => {
  httpDelete("/api/v1/documents/" + documentId + "/tags/" + tagId)
    .then(function(data) {
      dispatch({ type: "REMOVE_TAG", tagId: tagId, documentId: documentId})
    })
    .catch(function(error) {
      console.log(error)
    })
} }
