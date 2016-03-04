import React from "react"
import { Component } from "react"

export default class TestTwo extends Component {
  clickCallback = () => {
    console.log("remove")
  }

  render() {
    return (
      <div onClick={this.clickCallback}>
        {this.props.item.id}: {this.props.item.text}
      </div>
    )
  }
}
