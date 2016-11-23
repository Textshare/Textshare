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

  filterByTitleAndTags = (document) => {
    if (!this.props.search_text) return true;

    let textContains = (text1, text2) => {
      return text1.toLowerCase().indexOf(text2.toLowerCase()) > -1
    }
    let tagNames = document.tags.map((tag) => { return tag.name });
    return [document.title].concat(tagNames).some((text) => {
      return textContains(text, this.props.search_text);
    })
  }

  render() {
    return (
      <div>
        <div className="document-list-new-button" onClick={this.newDocument}>
          <div>Add document</div>
        </div>
        {
          this.props.documents
            .filter((document) => this.filterByTitleAndTags(document))
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
