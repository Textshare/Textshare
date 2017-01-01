import React from "react"
import { Component } from "react"
import "./DocumentsView.scss"
import DocumentList from "components/DocumentList"
import { setSearchText } from "../redux/actions/search"
import { setSorting } from "../redux/actions/sort"
import { connect } from "react-redux"
import "./SearchInput.scss"
import "react-select/dist/react-select.css"
import Select from "react-select"

class DocumentsView extends Component {
  _searchPhraseChanged = (event) => {
    const { dispatch } = this.props;

    dispatch(setSearchText(event.target.value));
  }

  _sortingChanged = (value) => {
    const { dispatch } = this.props;

    dispatch(setSorting(value));
  }

  render() {
    return (
      <div>
        <div className="row centered">
          <div className="col-lg-5 col-lg-offset-2 search-input">
            <input
              type="search"
              className="form-control"
              name="documents-search"
              placeholder="Search..."
              onChange={this._searchPhraseChanged}/>
          </div>
          <div className="col-lg-3">
            <Select
              value={this.props.choosenSorting}
              options={this.props.sortingOptions}
              onChange={this._sortingChanged}
            ></Select>
          </div>
        </div>
        <DocumentList></DocumentList>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  documents: Object.keys(state.documents).map((key) => state.documents[key]),
  choosenSorting: state.sort.sorting || { label: "Created desc.", type: "inserted_at", direction: -1 },
  sortingOptions: [
    { label: "Created asc.", type: "inserted_at", direction: 1 },
    { label: "Created desc.", type: "inserted_at", direction: -1 },
    { label: "Updated asc.", type: "updated_at", direction: 1 },
    { label: "Updated desc.", type: "updated_at", direction: -1 },
    { label: "Title asc.", type: "title", direction: 1 },
    { label: "Title desc.", type: "title", direction: -1 },
    { label: "Owner asc.", type: "owner.name", direction: 1 },
    { label: "Owner desc.", type: "owner.name", direction: -1 },
  ],
})

export default connect(mapStateToProps)(DocumentsView)
