import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import * as EditorActions from "redux/actions/editor"
import * as DocumentsActions from "redux/actions/documents"
import "./RevisionBlock.scss"
import moment from "moment"
import { httpPost } from "utils"
import { browserHistory } from "react-router"

class RevisionBlock extends Component {
  formatDate = (date) => { return moment(date).format("YYYY-MM-DD HH:mm:ss") }

  setRevisionAsCurrentDocumentContent = () => {
    this.props.setContent(this.props.documentId, this.props.revisionDiff.content)
    this.props.updateDocument(this.props.documentId).then(() => {
      browserHistory.push("/docs/" + this.props.documentId)
    })
  }

  createDocumentFromRevision = () => {
    this.props.addDocument().then((doc) => {
      this.props.setContent(doc.id, this.props.revisionDiff.content)
      this.props.updateDocument(doc.id).then(() => {
        browserHistory.push("/docs/" + doc.id)
      })
    })
  }

  render() {
    return (
      <div className="revision-block">
        <div>
          <div className="revision-block-metadata col-xs-12">
            {
              this.props.first ?
                <span className="revision-block-metadata-item">
                  {"Current revision"}
                </span> :
                <span>
                  <span className="revision-block-metadata-item">
                    {"Created at: " + this.formatDate(this.props.revisionDiff.inserted_at)}
                  </span>
                  <button
                    onClick={this.setRevisionAsCurrentDocumentContent}
                    className="revision-block-metadata-item">
                      Set as current document content
                  </button>
                  <button
                    onClick={this.createDocumentFromRevision}
                    className="revision-block-metadata-item">
                      Create new document from revision
                  </button>
                </span>
            }
          </div>
        </div>
        <div className="revision-block-content" style={{ clear: "both" }}>
          {
            this.props.revisionDiff.contentDiff.map((diff, index) => {
              if (diff[0] == 0) {
                return <span key={index}>{diff[1]}</span>
              } else if (diff[0] == -1) {
                return <span className="revision-block-red-diff" key={index}>{diff[1]}</span>
              } else if (diff[0] == 1) {
                return <span className="revision-block-green-diff" key={index}>{diff[1]}</span>
              }
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(
  function() { return {} },
  Object.assign({}, DocumentsActions, EditorActions)
)(RevisionBlock)
