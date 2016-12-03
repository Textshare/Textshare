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
        <div>
            {this.props.editedDocument.line}:{this.props.editedDocument.ch}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.token = UUID.create().hex

    const readOnly = this.props.current_user_id != this.props.editedDocument.owner.id
    this.codeMirror = CodeMirror.fromTextArea(findDOMNode(this.refs.codemirror), {readOnly: readOnly})
    this.codeMirror.setValue(this.props.editedDocument.content || "")

    this.channel = this.props.socket.channel("document:" + this.props.editedDocument.id, {})
    this.channel.on("document_changed", (payload) => {
      if (payload.body.token !== this.token) {
        const change = payload.body.change

        const targetLine = this.props.editedDocument.row_ids.indexOf(payload.body.targetRowId)
        const changeFrom = { ch: change.from.ch, line: targetLine }
        const changeTo =
          { ch: change.to.ch, line: targetLine + (change.to.line - change.from.line) }
        this.codeMirror.replaceRange(change.replacement, changeFrom, changeTo, "sync")

        const newRowCount = this.codeMirror.lineCount()
        const rowCountDiff = newRowCount - this.props.editedDocument.row_ids.length
        let newRowIds = this.props.editedDocument.row_ids.slice()
        if (rowCountDiff < 0) {
          newRowIds.splice(change.from.line, Math.abs(rowCountDiff))
        } else if (rowCountDiff > 0) {
          newRowIds.splice(change.from.line + 1, 0, ...payload.body.additionalRowIds)
        }

        this.props.setRowIds(this.props.documentId, newRowIds)
      }
    })
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    this.codeMirror.on("change", (cm, change) => {
      if (change.origin !== "setValue") {
        this.props.setContent(this.props.documentId, cm.getValue())
      }

      if (change.origin !== "setValue" && change.origin !== "sync") {
        const newRowCount = cm.lineCount()
        const targetRowId = this.props.editedDocument.row_ids[change.from.line]
        const rowCountDiff = newRowCount - this.props.editedDocument.row_ids.length
        let newRowIds = this.props.editedDocument.row_ids.slice()
        let additionalRowIds = []
        if (rowCountDiff < 0) {
          newRowIds.splice(change.from.line, Math.abs(rowCountDiff))
        } else if (rowCountDiff > 0) {
          additionalRowIds = [...Array(rowCountDiff).keys()].map(
            () => { return UUID.create().hex }
          )
          newRowIds.splice(change.from.line + 1, 0, ...additionalRowIds)
        }

        this._onContentChange(cm.getValue(), newRowIds)
        this.updateDocument()

        this.channel.push("document_changed", { body:
          {
            change: { replacement: change.text.join("\n"), from: change.from, to: change.to },
            targetRowId: targetRowId,
            additionalRowIds: additionalRowIds,
            token: this.token
          }
        })
      }
    })

    this.codeMirror.on("cursorActivity", (doc) => {
        let pos = doc.getCursor()
        this.props.setCursorPosition(this.props.documentId, pos.line, pos.ch)
    })

    this.codeMirror.on("blur", (doc) => {
        this.props.setCursorPosition(this.props.documentId, 0, 0)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.codeMirror.getValue() !== nextProps.editedDocument.content) {
      this.codeMirror.setValue(nextProps.editedDocument.content, "setValue")
    }
  }

  componentWillUnmount() {
    this.channel.leave()
  }
}

function mapStateToProps(state, props) {
  return {
    editedDocument: state.documents[props.documentId],
    socket: state.session.socket,
    current_user_id: state.session.currentUser.id
  }
}

export default connect(mapStateToProps, Object.assign({}, EditorActions, DocumentsActions))(Editor)
