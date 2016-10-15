export function setTitle(documentId, title) {
  return { type: "SET_TITLE", documentId: documentId, title: title }
}

export function setContent(documentId, content) {
  return { type: "SET_CONTENT", documentId: documentId, content: content }
}

export function setRowIds(documentId, rowIds) {
  return { type: "SET_ROW_IDS", documentId: documentId, rowIds: rowIds }
}
