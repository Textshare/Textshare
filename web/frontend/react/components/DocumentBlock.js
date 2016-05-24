import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./DocumentBlock.scss"

class DocumentBlock extends Component {
  blockContent = () => {
    if (this.props.document.content.rowOrder.length) {
      return this.props.document.content.rows[this.props.document.content.rowOrder[0]].text
    }
  }

  removeDocument = () => { this.props.removeDocument(this.props.document) }

  render() {
    return (
      <div className="document-block">
        <div>
          <div className="document-block-title col-xs-11">
            <Link to={"/docs/" + this.props.document.id}>
              {this.props.document.title}
            </Link>
          </div>
          <div className="col-xs-1" onClick={this.removeDocument}>
            <div className="remove-button">X</div>
          </div>
        </div>
        <div className="document-block-content" style={{ clear: "both" }}>
          {this.blockContent()}
        </div>
      </div>
    )
  }
}

export default DocumentBlock
