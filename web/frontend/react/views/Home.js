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
    console.log("add")
  }

  render() {
    return (
      <div>
        <div className="home-test-class">
          {
            this.collection.map((n) => {
              return (
                <div key={n} onClick={this.clickCallback}>
                  <span>{this.collection}</span>
                  <span>{n}</span>
                  <Test></Test>
                </div>
              )
            })
          }
        </div>
        <br></br>
        <div>
          {
            this.props.test.map((item) => {
              return (
                <TestTwo key={item.id} item={item}></TestTwo>
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
