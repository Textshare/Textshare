import React from "react"
import { Component } from "react"
import "./DocumentView.scss"
import Editor from "components/Editor"
import TagList from "components/TagList"

class DocumentView extends Component {
  render() {
    return (
      <div>
        <Editor></Editor>
      </div>
    )
  }
}

export default DocumentView
