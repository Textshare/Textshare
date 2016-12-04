import { httpGet, httpPost } from "utils"

export function fetchCollaborators(documentId) { return (dispatch) => {
  httpGet("/api/v1/documents/" + documentId + "/collaborators")
    .then(function(data) {
      dispatch({ type: "RESPONSE_COLLABORATORS", data: data, documentId: documentId})
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function fetchPossibleCollaborators(documentId) { return (dispatch) => {
  httpGet("/api/v1/documents/" + documentId + "/possible_collaborators")
    .then(function(data) {
      dispatch({ type: "RESPONSE_POSSIBLE_COLLABORATORS", data: data, documentId: documentId})
    })
    .catch(function(error) {
      console.log(error)
    })
} }

export function setCollaborators(documentId, collaboratorsIds) { return (dispatch) => {
  httpPost("/api/v1/documents/" + documentId + "/set_collaborators", { collaborators_ids: collaboratorsIds })
    .then(function(data) {
      console.log(data);
      dispatch({
        type: "RESPONSE_COLLABORATORS",
        data: data.collaborators,
        documentId: documentId,
      })
      dispatch({
        type: "RESPONSE_POSSIBLE_COLLABORATORS",
        data: data.possible_collaborators,
        documentId: documentId,
      })
    })
    .catch(function(error) {
      console.log(error)
    })
} }
