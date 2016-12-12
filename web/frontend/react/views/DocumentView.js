import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import Editor from "components/Editor"
import TagList from "components/TagList"
import { Link } from "react-router"
import { httpPost } from "utils"
import Collaborators from "components/Collaborators"
import Modal from "react-modal"

class DocumentView extends Component {
  modalStyles = {
    overlay : {
      position          : "fixed",
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : "rgba(230, 230, 230, 0.75)"
    },
    content : {
      position                   : "absolute",
      top                        : "200px",
      left                       : "200px",
      right                      : "200px",
      bottom                     : "200px",
      border                     : "1px solid #ccc",
      background                 : "#fff",
      overflow                   : "auto",
      WebkitOverflowScrolling    : "touch",
      borderRadius               : "4px",
      outline                    : "none",
      padding                    : "20px",
      boxShadow                  : "0px 0px 100px 0px rgba(0, 0, 0, 0.2)",
      minHeight                  : "200px",
      minWidth                   : "300px"
    }
  }

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
        <Modal
          isOpen={this.state.appendDocumentModalOpen}
          onRequestClose={this.closeAppendDocumentModal}
          contentLabel="Example Modal"
          style={this.modalStyles}
        >
          <span>Ziemniaki</span>
          <button onClick={this.closeAppendDocumentModal}>Close</button>
        </Modal>

        <Collaborators documentId={this.props.params.documentId}></Collaborators>
        <TagList documentId={this.props.params.documentId}></TagList>
        <span onClick={this.openAppendDocumentModal}>Append document</span>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

export default DocumentView
