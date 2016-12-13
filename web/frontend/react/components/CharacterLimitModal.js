import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import * as DocumentsActions from "redux/actions/documents"
import * as EditorActions from "redux/actions/editor"
import { httpPost, httpGet } from "utils"
import Modal from "react-modal"

class CharacterLimitModal extends Component {
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

  _handleLimitInput = (event) => {
    this.setState({ limit: !!event.target.value ? parseInt(event.target.value) : null })
  }

  confirmCharacterLimit = () => {
    this.props.setLimit(this.props.documentId, this.state.limit)
    this.props.updateDocument(this.props.documentId)

    this.setState({ limit: null })
    this.props.onRequestClose()
  }

  componentWillMount() {
    this.setState({ limit: null })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({ limit: nextProps.editedDocument.limit })
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          contentLabel="Set character limit for the document"
          style={this.modalStyles}
        >
          <div>
            <span>Enter the character limit for the document</span>
          </div>
          <div>
            <input
              type="number"
              value={this.state.limit || ""}
              onChange={this._handleLimitInput}>
            </input>
          </div>
          <div>
            <button onClick={this.confirmCharacterLimit}>Set limit</button>
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

export default connect(mapStateToProps, Object.assign({}, EditorActions, DocumentsActions))(CharacterLimitModal)
