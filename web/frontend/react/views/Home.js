import React from "react"
import { Component } from "react"
import "./Home.scss"
import Test from "components/Test"
import TestTwo from "components/TestTwo"
import { connect } from "react-redux"
import TestActions from "redux/actions/test"

class Home extends Component {
  collection = [1, 2, 3]

  clickCallback = () => {
    console.log(this)
  }

  addItem = () => {
    this.props.addItem({ id: new Date().getTime(), text: "test" })
  }

  render() {
    return (
      <div>
        <div className="">
          {
            this.props.test.map((item) => {
              return (
                <TestTwo key={item.id} item={item} removeItem={this.props.removeItem}></TestTwo>
              )
            })
          }
        </div>
        <div onClick={this.addItem}>
          Add item
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { test: state.test }
}

export default connect(mapStateToProps, TestActions)(Home)
