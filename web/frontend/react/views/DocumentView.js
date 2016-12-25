import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import { httpPost } from "utils"
import { Link } from "react-router"
import Editor from "components/Editor"
import TagList from "components/TagList"
import AppendDocumentModal from "components/AppendDocumentModal"
import CharacterLimitModal from "components/CharacterLimitModal"
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

  openCharacterLimitModal = () => {
    this.setState({ characterLimitModalOpen: true })
  }
  closeCharacterLimitModal = () => {
    this.setState({ characterLimitModalOpen: false })
  }

  componentWillMount() {
    this.setState({ appendDocumentModalOpen: false, characterLimitModalOpen: false })
  }


  render() {
    return (
      <div>
        <AppendDocumentModal
          documentId={this.props.params.documentId}
          isOpen={this.state.appendDocumentModalOpen}
          onRequestClose={this.closeAppendDocumentModal}
        ></AppendDocumentModal>

        <CharacterLimitModal
          documentId={this.props.params.documentId}
          isOpen={this.state.characterLimitModalOpen}
          onRequestClose={this.closeCharacterLimitModal}
        ></CharacterLimitModal>

        <Collaborators documentId={this.props.params.documentId}></Collaborators>
        <TagList documentId={this.props.params.documentId}></TagList>
        <button onClick={this.openAppendDocumentModal}>Append document</button>
        <button onClick={this.openCharacterLimitModal}>Set character limit</button>
        <button>
          <Link to={"/docs/" + this.props.params.documentId + "/revisions"}>Revisions</Link>
        </button>
        <button onClick={this.createRevision}>Create revision</button>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

export default DocumentView
