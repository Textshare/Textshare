import React from "react"
import { Component } from "react"
import "./Home.scss"
import Test from "components/Test"
import TestTwo from "components/TestTwo"
import { connect } from "react-redux"
import { Link } from "react-router";
import TestActions from "redux/actions/test"
import Actions from "../redux/actions/sessions";

class Home extends Component {
  collection = [1, 2, 3]

  clickCallback = () => {
    console.log(this)
  }

  addItem = () => {
    this.props.addItem({ id: new Date().getTime(), text: "test" })
  }

  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(Actions.signOut());
  }

  userMessage = () => {
    let msg;

    if(this.props.currentUser) {
      msg = this.props.currentUser.name;
    } else {
      msg = "Not logged in";
    }

    return msg;
  };

  links = () => {
    if(this.props.currentUser) {
      return <a href="#" onClick={::this._handleSignOutClick}><i className="fa fa-sign-out"/> Sign out</a>
    } else {
      return(
        <div>
          <Link to="/sign_up">Sign up</Link>
          <br/>
          <Link to="/sign_in">Sign in</Link>
        </div>
      )
    }
  };

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
        <h1>{this.userMessage()}</h1>
        {this.links()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  test: state.test, currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(Home);
