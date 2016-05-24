import { httpGet } from "utils"

// TODO: don't use temporary uuid once we start creating CRUD after authentication is implemented
export function addDocument(uuid) {
  return { type: "ADD_DOCUMENT", uuid: uuid }
}

export function fetchDocuments() { return (dispatch) => {
  httpGet("/api/v1/documents")
    .then(function(data) {
      dispatch({ type: "RESPONSE_DOCUMENTS", data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
} }
