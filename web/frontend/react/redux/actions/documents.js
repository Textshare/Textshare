// TODO: don't use temporary uuid once we start creating CRUD after authentication is implemented
export function addDocument(uuid) {
  return { type: "ADD_DOCUMENT", uuid: uuid }
}
