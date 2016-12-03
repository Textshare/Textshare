import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import * as TagsActions from "redux/actions/tags"
import "./TagList.scss"
import { WithContext as ReactTags } from "react-tag-input"

class TagList extends Component {
  componentWillMount() {
    this.props.fetchTags(this.props.documentId)
  }

  _handleDelete = (index) => {
    this.props.removeTag(this.props.documentId, this.props.tags[index].id)
  }
  _handleAddition = (name) => { this.props.addTag(this.props.documentId, name) }

  render() {
    return (
      <div>
        <ReactTags
          autofocus={false}
          tags={this.props.tags}
          suggestions={[]}
          labelField={"name"}
          readOnly={this.props.readOnly}
          handleDelete={this._handleDelete}
          handleAddition={this._handleAddition}
        ></ReactTags>
        <div style={{ clear: "both" }}></div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let tagIds = state.documents[ownProps.documentId].tagIds || []
  return {
    tags: tagIds.map((key) => state.tags[key]),
    readOnly: state.documents[ownProps.documentId].owner.id != state.session.currentUser.id
  }
}

export default connect(mapStateToProps, TagsActions)(TagList)
