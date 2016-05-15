import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import DocumentBlock from "components/DocumentBlock"
import "./DocumentList.scss"

class DocumentList extends Component {
  render() {
    return (
      <div>
        {
          this.props.documents.map((document) =>
            <DocumentBlock key={document.id} document={document}></DocumentBlock>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    documents: Object.keys(state.documents).map((key) => state.documents[key])
  }
}

export default connect(mapStateToProps, {})(DocumentList)
