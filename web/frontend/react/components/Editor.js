import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import Row from "components/Row"
import "./Editor.scss"

class Editor extends Component {
  rowChangeCallback = (event, rowId, payload) => {
    console.log(event.type, rowId, payload)
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

export default connect(mapStateToProps)(Editor)
