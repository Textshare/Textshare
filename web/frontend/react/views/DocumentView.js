import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import "./DocumentView.scss"
import Editor from "components/Editor"
import * as DocumentsActions from "redux/actions/documents"
import * as EditorActions from "redux/actions/editor"
import TagList from "components/TagList"
import { Link } from "react-router"
import { httpPost, httpGet } from "utils"
import Collaborators from "components/Collaborators"
import Modal from "react-modal"
import Select from "react-select"
import UUID from "uuid-js"

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

  selectDocumentToAppend = (selection) => {
    this.setState({ selectedDocumentToAppend: selection ? selection.value : null })
  }

  documentsToDropdownOptions = (docs) => {
    return docs.filter((doc) => {
      return doc.id != this.props.params.documentId
    }).map((doc) => {
      return { value: doc, label: doc.title }
    })
  }

  openAppendDocumentModal = () => {
    this.setState({ appendDocumentModalOpen: true })
    httpGet("/api/v1/documents").then((documents) => {
      this.setState({ availableDocumentsToAppend: documents })
    })
  }

  confirmAppendDocument = () => {
    if (!this.state.selectedDocumentToAppend) {
      return;
    } else {
      let newContent = this.props.editedDocument.content + "\n" +
        this.state.selectedDocumentToAppend.content
      let newRowIds = this.props.editedDocument.row_ids.concat(
        this.state.selectedDocumentToAppend.row_ids.map((_row_id) => {
          return UUID.create().hex
        })
      )

      this.props.setContent(this.props.params.documentId, newContent)
      this.props.setRowIds(this.props.params.documentId, newRowIds)

      this.props.updateDocument(this.props.params.documentId)

      this.closeAppendDocumentModal()
    }
  }

  closeAppendDocumentModal = () => {
    this.setState({
      appendDocumentModalOpen: false, availableDocumentsToAppend: [], selectedDocumentToAppend: null
    })
  }

  componentWillMount() {
    this.setState({
      appendDocumentModalOpen: false, availableDocumentsToAppend: [], selectedDocumentToAppend: null
    })
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
          contentLabel="Append other document's contents to this one"
          style={this.modalStyles}
        >
          <div>
            <span>Choose the document to append to the currently opened one</span>
          </div>
          <div>
            <Select
              name="appended-document"
              value={this.state.selectedDocumentToAppend}
              valueRenderer={function (option) { return option.title }}
              options={this.documentsToDropdownOptions(this.state.availableDocumentsToAppend)}
              onChange={this.selectDocumentToAppend}
            ></Select>
          </div>
          <div>
            <button onClick={this.confirmAppendDocument}>Append</button>
          </div>
          <div>
            <button onClick={this.closeAppendDocumentModal}>Close</button>
          </div>
        </Modal>

        <Collaborators documentId={this.props.params.documentId}></Collaborators>
        <TagList documentId={this.props.params.documentId}></TagList>
        <span onClick={this.openAppendDocumentModal}>Append document</span>
        <Editor documentId={this.props.params.documentId}></Editor>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    editedDocument: state.documents[props.params.documentId],
  }
}

export default connect(mapStateToProps, Object.assign({}, EditorActions, DocumentsActions))(DocumentView)
