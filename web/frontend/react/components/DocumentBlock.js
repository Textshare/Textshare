import React from "react"
import { Component } from "react"
import "./DocumentBlock.scss"

class DocumentBlock extends Component {
  blockContent = () => {
    if (this.props.document.content.rowOrder.length) {
      return this.props.document.content.rows[this.props.document.content.rowOrder[0]].text
    }
  }

  render() {
    return (
      <div className="document-block">
        <div className="document-block-title">
          {this.props.document.title}
        </div>
        <div className="document-block-content">
          {this.blockContent()}
        </div>
      </div>
    )
  }
}

export default DocumentBlock
