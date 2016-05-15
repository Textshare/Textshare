import React from "react"
import { Component } from "react"
import "./DocumentsView.scss"
import DocumentList from "components/DocumentList"

class DocumentsView extends Component {
  render() {
    return (
      <div>
        <DocumentList></DocumentList>
      </div>
    )
  }
}

export default DocumentsView
