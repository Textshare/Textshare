import React from "react"
import { Component } from "react"
import "./Home.scss"
import Editor from "components/Editor"

class Home extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: 50 + "px" }}>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Editor></Editor>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    )
  }
}

export default Home
