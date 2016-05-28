import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import Row from "components/Row"
import * as DocumentsActions from "redux/actions/documents"
import * as EditorActions from "redux/actions/editor"
import UUID from "uuid-js"
import { keyDownHandler, keyUpHandler, onPasteHandler } from "./editor_input_handler"
import "./Editor.scss"

class Editor extends Component {
  componentWillMount() {
    this.props.getDocument(this.props.documentId)
  }

  _onTitleChange = (event) => {
    this.props.setTitle(this.props.documentId, event.target.value)
  }

  onInput = (_event, rowId, newText) => {
    this.props.setRowText(this.props.documentId, rowId, newText)
  }
  onKeyDown = (event, rowId) => { keyDownHandler(event, rowId, this.props) }
  onKeyUp = (event, rowId) => { keyUpHandler(event, rowId, this.props) }
  onClick = (_event) => { this.props.setCursorPosition(window.getSelection().anchorOffset) }
  onBlur = (_event) => { this.props.setFocusedRow(null) }
  onFocus = (_event, rowId) => { this.props.setFocusedRow(rowId) }
  onPaste = (event, rowId) => { onPasteHandler(event, rowId, this.props) }

  render() {
    return (
      <div className="editor">
        <input
          className="editor-title-input"
          value={this.props.editedDocument.title}
          type="text"
          onChange={this._onTitleChange}
          size={50}
        ></input>
        {this.props.rows.map((row) =>
          <Row
            key={row.id}
            row={row}
            focusedRowId={this.props.focusedRowId}
            cursorPosition={this.props.cursorPosition}
            onInput={this.onInput}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            onClick={this.onClick}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onPaste={this.onPaste}
          ></Row>
        )}
      </div>
    )
  }

  componentDidMount() {
    if (this.props.rows.length === 0) {
      let uuid = UUID.create().hex
      this.props.addRow(this.props.documentId, uuid)
      this.props.setFocusedRow(uuid)
    }
  }
}

function mapStateToProps(state, props) {
  let content = state.documents[props.documentId].content
  return {
    editedDocument: state.documents[props.documentId],
    rows: content.rowOrder.map((rowId) => content.rows[rowId]),
    focusedRowId: state.editor.focusedRowId,
    cursorPosition: state.editor.cursorPosition
  }
}

export default connect(mapStateToProps, Object.assign({}, EditorActions, DocumentsActions))(Editor)
