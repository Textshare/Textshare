import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./Navbar.scss"

class Editor extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <Link to="/docs">
            <p className="navbar-text">TextShare</p>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Editor
