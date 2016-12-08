import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import Editor from "components/Editor"
import TagList from "components/TagList"
import { Link } from "react-router"
import { httpPost } from "utils"
import Collaborators from "components/Collaborators"

class DocumentView extends Component {
  createRevision = () => {
    httpPost("/api/v1/documents/" + this.props.params.documentId + "/revisions")
  }

  // It seems like it can't be commented out in the render function leaving it here.
  // It should be later added to render function.
  // <Link to={"/docs/" + this.props.params.documentId + "/revisions"}>Revisions</Link>
  // <span onClick={this.createRevision}>Create revision</span>

  render() {
    return (
      <div>
        <Collaborators documentId={this.props.params.documentId}></Collaborators>
        <TagList documentId={this.props.params.documentId}></TagList>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

export default DocumentView
