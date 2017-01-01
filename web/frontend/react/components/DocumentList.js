import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { addDocument, fetchDocuments, removeDocument } from "redux/actions/documents"
import { setSorting } from "redux/actions/sort"
import DocumentBlock from "components/DocumentBlock"
import "./DocumentList.scss"
import { browserHistory } from "react-router"

class DocumentList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchDocuments()).then((_data) => {
      this.props.dispatch(setSorting(this.props.choosenSorting))
    })
  }

  newDocument = (_event) => {
    this.props.dispatch(addDocument()).then(function(data) { browserHistory.push("/docs/" + data.id) })
  }

  render() {
    return (
      <div>
        <div className="document-list-new-button" onClick={this.newDocument}>
          <div>Add document</div>
        </div>
        {
          this.props.documents
            .filter((document) => !document.hide)
            .sort((doc1, doc2) => doc1.order > doc2.order)
            .map((document) =>
            <DocumentBlock
              key={document.id}
              document={document}
              canRemove={document.owner.id == this.props.current_user_id}
            ></DocumentBlock>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    choosenSorting: state.sort.sorting || { label: "Created desc.", type: "inserted_at", direction: -1 },
    documents: Object.keys(state.documents).map((key) => state.documents[key]),
    search_text: state.search.text,
    current_user_id: state.session.currentUser.id
  }
}

export default connect(mapStateToProps)(DocumentList)
