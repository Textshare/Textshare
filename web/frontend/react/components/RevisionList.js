import React from "react"
import { Component } from "react"
import "./RevisionList.scss"
import RevisionBlock from "components/RevisionBlock"

class RevisionList extends Component {
  render() {
    return (
      <div>
        {
          this.props.revisions.map((revision, index) => {
            return <RevisionBlock revision={revision} first={index == 0}></RevisionBlock>
          })
        }
      </div>
    )
  }
}

export default RevisionList
