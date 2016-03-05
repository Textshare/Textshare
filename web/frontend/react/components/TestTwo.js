import React from "react"
import { Component } from "react"

export default class TestTwo extends Component {


  render() {
    return (
      <div onClick={() => this.props.removeItem(this.props.item)}>
        {this.props.item.text}-{this.props.item.id}
      </div>
    )
  }
}
