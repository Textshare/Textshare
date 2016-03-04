import React from "react"
import { Component } from "react"
import "./Test.scss"

export default class Test extends Component {
  clickCallback = () => {
    console.log("hello2")
  }

  render() {
    return (
      <div onClick={this.clickCallback} className="test-class">hello world</div>
    )
  }
}
