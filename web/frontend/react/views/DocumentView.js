import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import { httpPost } from "utils"
import { Link } from "react-router"
import Editor from "components/Editor"
import TagList from "components/TagList"
import AppendDocumentModal from "components/AppendDocumentModal"
import Collaborators from "components/Collaborators"

class DocumentView extends Component {
  createRevision = () => {
    httpPost("/api/v1/documents/" + this.props.params.documentId + "/revisions")
  }

  openAppendDocumentModal = () => {
    this.setState({ appendDocumentModalOpen: true })
  }
  closeAppendDocumentModal = () => {
    this.setState({ appendDocumentModalOpen: false })
  }

  componentWillMount() {
    this.setState({ appendDocumentModalOpen: false })
  }

  // It seems like it can't be commented out in the render function leaving it here.
  // It should be later added to render function.
  // <Link to={"/docs/" + this.props.params.documentId + "/revisions"}>Revisions</Link>
  // <span onClick={this.createRevision}>Create revision</span>

  render() {
    return (
      <div>
        <AppendDocumentModal
          documentId={this.props.params.documentId}
          isOpen={this.state.appendDocumentModalOpen}
          onRequestClose={this.closeAppendDocumentModal}
        ></AppendDocumentModal>

        <Collaborators documentId={this.props.params.documentId}></Collaborators>
        <TagList documentId={this.props.params.documentId}></TagList>
        <span onClick={this.openAppendDocumentModal}>Append document</span>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

export default DocumentView
