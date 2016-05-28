import React from "react"
import { Component } from "react"
import "./DocumentsView.scss"
import DocumentList from "components/DocumentList"
import { setSearchText } from "../redux/actions/search"
import { connect } from "react-redux"
import "./SearchInput.scss"

class DocumentsView extends Component {
  _searchPhraseChanged = (event) => {
    const { dispatch } = this.props;

    dispatch(setSearchText(event.target.value));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 search-input">
            <input
              type="search"
              className="form-control"
              name="documents-search"
              placeholder="Search..."
              onChange={this._searchPhraseChanged}/>
          </div>
        </div>
        <DocumentList></DocumentList>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  documents: Object.keys(state.documents).map((key) => state.documents[key])
});

export default connect(mapStateToProps)(DocumentsView)
