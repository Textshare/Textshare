import React from "react"
import { Component } from "react"
import "./RevisionsView.scss"
import RevisionList from "components/RevisionList"
import { httpGet } from "utils"

class RevisionsView extends Component {
  componentWillMount() {
    this.setState({ revisions: [] })
  }

  componentDidMount() {
    httpGet("/api/v1/documents/" + this.props.params.documentId + "/revisions").then((data) => {
      this.setState({ revisions: data })
    })
  }

  render() {
    return (
      <div>
        <RevisionList
          revisions={this.state.revisions}
          documentId={this.props.params.documentId}>
        </RevisionList>
      </div>
    )
  }
}

export default RevisionsView
