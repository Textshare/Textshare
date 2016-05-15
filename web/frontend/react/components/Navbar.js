import React from "react"
import { Component } from "react"
import "./Navbar.scss"

class Editor extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <p className="navbar-text">TextShare</p>
        </div>
      </nav>
    )
  }
}

export default Editor
