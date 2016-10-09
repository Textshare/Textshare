import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./DocumentBlock.scss"

class DocumentBlock extends Component {
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
          {this.props.document.content}
        </div>
      </div>
    )
  }
}

export default DocumentBlock
