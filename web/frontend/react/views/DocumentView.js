import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import Editor from "components/Editor"

class DocumentsView extends Component {
  render() {
    return (
      <div>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

export default DocumentsView