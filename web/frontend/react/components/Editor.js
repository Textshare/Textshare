import React from "react"
import { findDOMNode } from "react-dom"
import { Component } from "react"
import { connect } from "react-redux"
import * as DocumentsActions from "redux/actions/documents"
import * as EditorActions from "redux/actions/editor"
import UUID from "uuid-js"
import "./Editor.scss"
import CodeMirror from "codemirror"
import "codemirror/lib/codemirror.css"

class Editor extends Component {
  componentWillMount() {
    this.props.getDocument(this.props.documentId)
  }

  updateDocument = () => {
    this.props.updateDocument(this.props.documentId)
  }

  _onTitleChange = (event) => {
    this.props.setTitle(this.props.documentId, event.target.value)
  }

  _onContentChange = (newContent, newRowIds) => {
    this.props.setContent(this.props.documentId, newContent)
    this.props.setRowIds(this.props.documentId, newRowIds)
  }

  render() {
    return (
      <div className="editor">
        <input
          className="editor-title-input"
          value={this.props.editedDocument.title}
          type="text"
          onChange={this._onTitleChange}
          onBlur={this.updateDocument}
          size={50}
        ></input>
        <div className="codemirror-container">
          <textarea ref="codemirror"></textarea>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.codeMirror = CodeMirror.fromTextArea(findDOMNode(this.refs.codemirror))
    this.codeMirror.setValue(this.props.editedDocument.content || "")
    this.codeMirror.on("change", (cm, change) => {
      if (change.origin !== "setValue") {
        const newRowCount = cm.lineCount()
        const targetRowId = this.props.editedDocument.row_ids[change.from.line]
        const rowCountDiff = newRowCount - this.props.editedDocument.row_ids.length
        let newRowIds = this.props.editedDocument.row_ids.slice()
        if (rowCountDiff < 0) {
          newRowIds.splice(change.from.line, Math.abs(rowCountDiff))
        } else if (rowCountDiff > 0) {
          const additionalRowIds = [...Array(rowCountDiff).keys()].map(
            () => { return UUID.create().hex }
          )
          newRowIds.splice(change.from.line + 1, 0, ...additionalRowIds)
        }

        this._onContentChange(cm.getValue(), newRowIds)
        this.updateDocument()
      }
    })
    window.hack = this.codeMirror
  }

  componentWillReceiveProps(nextProps) {
    if (this.codeMirror.getValue() !== nextProps.editedDocument.content) {
      this.codeMirror.setValue(nextProps.editedDocument.content, "setValue")
    }
  }
}

function mapStateToProps(state, props) {
  return {
    editedDocument: state.documents[props.documentId],
  }
}

export default connect(mapStateToProps, Object.assign({}, EditorActions, DocumentsActions))(Editor)
