import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import * as DocumentsActions from "redux/actions/documents"
import UUID from "uuid-js"
import DocumentBlock from "components/DocumentBlock"
import "./DocumentList.scss"

class DocumentList extends Component {
  componentWillMount() {
    this.props.fetchDocuments()
  }

  newDocument = (_event) => {
  // TODO: don't use temporary uuid once we start creating CRUD after authentication is implemented
    let uuid = UUID.create().hex
    this.props.addDocument(uuid)
  }

  render() {
    return (
      <div>
        <div className="document-list-new-button" onClick={this.newDocument}>
          <div>Add document</div>
        </div>
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

export default connect(mapStateToProps, DocumentsActions)(DocumentList)
