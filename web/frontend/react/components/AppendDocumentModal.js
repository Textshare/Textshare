import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import * as DocumentsActions from "redux/actions/documents"
import * as EditorActions from "redux/actions/editor"
import { httpPost, httpGet } from "utils"
import Modal from "react-modal"
import Select from "react-select"
import UUID from "uuid-js"

class AppendDocumentModal extends Component {
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

  selectDocumentToAppend = (selection) => {
    this.setState({ selectedDocumentToAppend: selection ? selection.value : null })
  }

  documentsToDropdownOptions = (docs) => {
    return docs.filter((doc) => {
      return doc.id != this.props.documentId
    }).map((doc) => {
      return { value: doc, label: doc.title }
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

      this.props.setContent(this.props.documentId, newContent)
      this.props.setRowIds(this.props.documentId, newRowIds)

      this.props.updateDocument(this.props.documentId)

      this.setState({ availableDocumentsToAppend: [], selectedDocumentToAppend: null })
      this.props.onRequestClose()
    }
  }

  componentWillMount() {
    this.setState({
      availableDocumentsToAppend: [], selectedDocumentToAppend: null
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      httpGet("/api/v1/documents").then((documents) => {
        this.setState({ availableDocumentsToAppend: documents })
      })
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
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
            <button onClick={this.props.onRequestClose}>Close</button>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    editedDocument: state.documents[props.documentId],
  }
}

export default connect(mapStateToProps, Object.assign({}, EditorActions, DocumentsActions))(AppendDocumentModal)
