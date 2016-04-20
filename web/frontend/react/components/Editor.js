import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import Row from "components/Row"
import EditorActions from "redux/actions/editor"
import "./Editor.scss"

class Editor extends Component {
  rowChangeCallback = (event, rowId, payload) => {
    if (event.type === "input") {
      this.props.setRowText(rowId, payload.text)
    }
  }

  render() {
    return (
      <div className="editor">
        {this.props.rows.map((row) =>
          <Row key={row.id} row={row} onChange={this.rowChangeCallback}></Row>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { rows: state.editor.rowOrder.map((rowId) => state.editor.rows[rowId]) }
}

export default connect(mapStateToProps, EditorActions)(Editor)
