import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./RevisionBlock.scss"
import moment from "moment"

class RevisionBlock extends Component {
  formatDate = (date) => { return moment(date).format("YYYY-MM-DD HH:mm:ss") }

  render() {
    return (
      <div className="revision-block">
        <div>
          <div className="revision-block-metadata col-xs-12">
            <span className="revision-block-metadata-item">
              {
                this.props.first ?
                  "Current revision" :
                  "Created at: " + this.formatDate(this.props.revisionDiff.inserted_at)
              }
            </span>
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

export default RevisionBlock
