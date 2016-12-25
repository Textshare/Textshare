import React from "react"
import { Component } from "react"
import Modal from "react-modal"

class RemoveDocumentModal extends Component {
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

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          contentLabel="Remove this document?"
          style={this.modalStyles}
        >
          <div>
            <span>Are you sure this document should be removed?</span>
          </div>
          <div>
            <button onClick={this.props.confirmRemoveDocument}>Yes</button>
          </div>
          <div>
            <button onClick={this.props.onRequestClose}>No</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default RemoveDocumentModal
