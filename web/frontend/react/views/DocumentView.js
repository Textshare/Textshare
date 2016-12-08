import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import Editor from "components/Editor"
import TagList from "components/TagList"
import { Link } from "react-router"
import { httpPost } from "utils"

class DocumentView extends Component {
  createRevision = () => {
    httpPost("/api/v1/documents/" + this.props.params.documentId + "/revisions")
  }

  render() {
    return (
      <div>
        <TagList documentId={this.props.params.documentId}></TagList>
        <Link to={"/docs/" + this.props.params.documentId + "/revisions"}>Revisions</Link>
        <span onClick={this.createRevision}>Create revision</span>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

export default DocumentView
