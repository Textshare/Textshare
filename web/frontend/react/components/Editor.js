import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import Row from "components/Row"

class Editor extends Component {
  render() {
    return (
      <div>
        {this.props.rows.map((row) =>
          <Row key={row.id} row={row}></Row>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { rows: state.editor.rowOrder.map((rowId) => {
    return Object.assign({}, state.editor.rows[rowId], { id: rowId })
  })}
}

export default connect(mapStateToProps)(Editor)
