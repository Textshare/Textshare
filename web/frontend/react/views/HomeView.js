import React from "react"
import { Component } from "react"
import "./HomeView.scss"
import Navbar from "components/Navbar"

class HomeView extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <Navbar></Navbar>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

export default HomeView
