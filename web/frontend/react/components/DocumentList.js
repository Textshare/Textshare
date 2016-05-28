import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import * as DocumentsActions from "redux/actions/documents"
import DocumentBlock from "components/DocumentBlock"
import "./DocumentList.scss"

class DocumentList extends Component {
  componentWillMount() {
    this.props.fetchDocuments()
  }

  newDocument = (_event) => {
    this.props.addDocument()
  }

  documentTitleMatchSearchText = (documentTitle) => {
    if(!this.props.search_text) return true;
    return documentTitle.toLowerCase().indexOf(this.props.search_text.toLowerCase()) > -1;
  }

  render() {
    return (
      <div>
        <div className="document-list-new-button" onClick={this.newDocument}>
          <div>Add document</div>
        </div>
        {
          this.props.documents
            .filter((document) => this.documentTitleMatchSearchText(document.title))
            .map((document) =>
            <DocumentBlock
              key={document.id}
              document={document}
              removeDocument={this.props.removeDocument}
            ></DocumentBlock>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    documents: Object.keys(state.documents).map((key) => state.documents[key]),
    search_text: state.search.text,
  }
}

export default connect(mapStateToProps, DocumentsActions)(DocumentList)
