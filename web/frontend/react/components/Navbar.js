import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./Navbar.scss";
import Actions from "../redux/actions/sessions";
import { connect } from "react-redux";

class Editor extends Component {
  _handleSignOutClick(e) {
    e.preventDefault();

    this.props.dispatch(Actions.signOut());
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <Link to="/docs">
            <p className="navbar-text">TextShare</p>
          </Link>
        </div>
        <div className="container">
          <a href="#" onClick={::this._handleSignOutClick} className="navbar-text"> Sign out</a>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(Editor);
