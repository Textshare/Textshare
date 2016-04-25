import React from "react"
import { Component } from "react"
import "./Row.scss"

class Row extends Component {
  onInput = (event) => { this.props.onInput(event, this.props.row.id, this.div.innerText) }
  onKeyDown = (event) => { this.props.onKeyDown(event, this.props.row.id) }
  onKeyUp = (event) => { this.props.onKeyUp(event, this.props.row.id) }
  onClick = (event) => { this.props.onClick(event, this.props.row.id) }
  onBlur = (event) => { this.props.onBlur(event) }

  setCursorPosition = (position) => {
    let selection = window.getSelection()
    let range = document.createRange()
    // TODO: iterate over text nodes instead of taking the first node. It works fine now as long as
    //       the row has only one plain text element, but breaks otherwise.
    range.setStart(this.div.childNodes[0], position)
    range.setEnd(this.div.childNodes[0], position)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  render() {
    return (
      <div
        className="editor-row"
        contentEditable={true}
        ref={(div) => { this.div = div }}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onClick={this.onClick}
        onBlur={this.onBlur}
      ></div>
    )
  }

  componentDidMount() {
    this.div.innerText = this.props.row.text
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.row.text !== this.div.innerText ||
      nextProps.focusedRowId === nextProps.row.id &&
      nextProps.cursorPosition !== window.getSelection().anchorOffset
  }

  componentDidUpdate() {
    if (this.props.row.text !== this.div.innerText) {
      this.div.innerText = this.props.row.text
    }

    if (this.props.focusedRowId === this.props.row.id &&
    this.props.cursorPosition !== window.getSelection().anchorOffset) {
      this.setCursorPosition(this.props.cursorPosition)
    }
  }
}

export default Row
