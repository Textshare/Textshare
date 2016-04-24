import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import Row from "components/Row"
import EditorActions from "redux/actions/editor"
import { keyDownHandler, keyUpHandler, onClickHandler } from "./editor_input_handler"
import "./Editor.scss"

class Editor extends Component {
  onInput = (_event, rowId, newText) => { this.props.setRowText(rowId, newText) }
  onKeyDown = (event, rowId) => { keyDownHandler(event, rowId, this.props) }
  onKeyUp = (event, rowId) => { keyUpHandler(event, rowId, this.props) }
  onClick = (event, rowId) => { onClickHandler(event, rowId, this.props) }
  onBlur = (_event) => { this.props.setFocusedRow(null) }

  render() {
    return (
      <div className="editor">
        {this.props.rows.map((row) =>
          <Row
            key={row.id}
            row={row}
            focusedRowId={this.props.focusedRowId}
            cursorPosition={this.props.cursorPosition}
            onInput={this.onInput}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            onClick={this.onClick}
            onBlur={this.onBlur}
          ></Row>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rows: state.editor.rowOrder.map((rowId) => state.editor.rows[rowId]),
    focusedRowId: state.editor.focusedRowId,
    cursorPosition: state.editor.cursorPosition
  }
}

export default connect(mapStateToProps, EditorActions)(Editor)
