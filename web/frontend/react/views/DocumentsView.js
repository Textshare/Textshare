import React from "react"
import { Component } from "react"
import "./DocumentsView.scss"
import DocumentList from "components/DocumentList"
import { setSearchText } from "../redux/actions/search"
import { connect } from "react-redux"

class DocumentsView extends Component {
  _searchPhraseChanged = (event) => {
    const { dispatch } = this.props;

    dispatch(setSearchText(event.target.value));
  }

  render() {
    return (
      <div>
        <input type="search" name="documents-search" onChange={this._searchPhraseChanged}/>
        <DocumentList></DocumentList>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  documents: Object.keys(state.documents).map((key) => state.documents[key])
});

export default connect(mapStateToProps)(DocumentsView)
