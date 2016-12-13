export function setTitle(documentId, title) {
  return { type: "SET_TITLE", documentId: documentId, title: title }
}

export function setContent(documentId, content) {
  return { type: "SET_CONTENT", documentId: documentId, content: content }
}

export function setRowIds(documentId, rowIds) {
  return { type: "SET_ROW_IDS", documentId: documentId, rowIds: rowIds }
}

export function setLimit(documentId, limit) {
  return { type: "SET_LIMIT", documentId: documentId, limit: limit }
}

export function setCursorPosition(documentId, line, ch) {
  return { type: "SET_CUR_POS", documentId: documentId, line: line, ch: ch }
}
