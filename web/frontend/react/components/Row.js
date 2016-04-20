import React from "react"
import { Component } from "react"
import "./Row.scss"

class Row extends Component {
  onChange = (event) => {
    this.props.onChange(event, this.props.row.id, { text: this.div.innerHTML })
  }

  render() {
    return (
      <div
        className="editor-row"
        contentEditable={true}
        ref={(div) => { this.div = div }}
        onInput={this.onChange}
        onBlur={this.onChange}
        onFocus={this.onChange}
      ></div>
    )
  }
}

export default Row
