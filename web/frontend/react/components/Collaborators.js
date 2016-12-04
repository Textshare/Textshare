import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import * as CollaboratorsActions from "redux/actions/collaborators"
import "react-select/dist/react-select.css"
import Select from "react-select"

class Collaborators extends Component {
  componentWillMount() {
    this.props.fetchCollaborators(this.props.documentId)
    this.props.fetchPossibleCollaborators(this.props.documentId)
  }

  setCollaborators = (val) => { this.props.setCollaborators(this.props.documentId, val) }

  render() {
    return (
      <div>
      <Select
      name="collaborators"
      value={this.props.collaborators}
      options={this.props.possibleCollaborators}
      menuContainerStyle={{ zIndex: 5 }}
      onChange={this.setCollaborators}
      multi={true}
      simpleValue={true}
      disabled={this.props.readOnly}
      ></Select>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let collaboratorsIds = state.documents[ownProps.documentId].collaboratorsIds || []
  let possibleCollaboratorsIds = state.documents[ownProps.documentId].possibleCollaboratorsIds || []
  return {
    collaborators: collaboratorsIds.map((key) => state.collaborators[key]),
    possibleCollaborators: possibleCollaboratorsIds.map((key) => state.possibleCollaborators[key]),
    readOnly: state.documents[ownProps.documentId].owner.id != state.session.currentUser.id
  }
}

export default connect(mapStateToProps, CollaboratorsActions)(Collaborators)
