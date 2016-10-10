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

  _onContentChange = (newContent) => {
    this.props.setContent(this.props.documentId, newContent)
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
        console.log("here1");
        this._onContentChange(cm.getValue())
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
