import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./DocumentBlock.scss"
import moment from "moment"
import RemoveDocumentModal from "components/RemoveDocumentModal"

class DocumentBlock extends Component {
  removeDocument = () => { this.props.removeDocument(this.props.document) }
  formatDate = (date) => { return moment(date).format("YYYY-MM-DD HH:mm:ss") }

  removeButton = (canRemove) => {
    if (canRemove) {
      return <div className="remove-button">X</div>;
    } else {
      return null;
    }
  }

  openRemoveDocumentModal = () => {
    this.setState({ removeDocumentModalOpen: true })
  }
  closeRemoveDocumentModal = () => {
    this.setState({ removeDocumentModalOpen: false })
  }

  componentWillMount() {
    this.setState({ removeDocumentModalOpen: false })
  }

  render() {
    return (
      <div className="document-block">
        <RemoveDocumentModal
          confirmRemoveDocument={this.removeDocument}
          isOpen={this.state.removeDocumentModalOpen}
          onRequestClose={this.closeRemoveDocumentModal}
        ></RemoveDocumentModal>

        <div>
          <div className="document-block-metadata col-xs-12">
            <span className="document-block-metadata-item">
              {"Created by: " + this.props.document.owner.name}
            </span>
            <span className="document-block-metadata-item">
              {"Created at: " + this.formatDate(this.props.document.inserted_at)}
            </span>
            <span className="document-block-metadata-item">
              {"Updated at: " + this.formatDate(this.props.document.updated_at)}
            </span>
            <span className="document-block-metadata-item">
              {"Tags: " + this.props.document.tags.map((tag) => { return tag.name }).join(", ")}
            </span>
          </div>
          <div className="document-block-title col-xs-11">
            <Link to={"/docs/" + this.props.document.id}>
              {this.props.document.title}
            </Link>
          </div>
          <div className="col-xs-1" onClick={this.openRemoveDocumentModal}>
            {this.removeButton(this.props.canRemove)}
          </div>
        </div>
        <div className="document-block-content" style={{ clear: "both" }}>
          {this.props.document.content}
        </div>
      </div>
    )
  }
}

export default DocumentBlock
