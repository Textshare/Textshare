import React from "react"
import { Component } from "react"
import "./Row.scss"

class Row extends Component {
  render() {
    return (
      <div className="editor-row">
        {this.props.row.text}
      </div>
    )
  }
}

export default Row
