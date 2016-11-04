import React from "react"
import { Component } from "react"
import { Link } from "react-router"
import "./Navbar.scss";
import Actions from "../redux/actions/sessions";
import { connect } from "react-redux";

class Navbar extends Component {
  _handleSignOutClick(e) {
    e.preventDefault();

    // this.props.dispatch(Actions.signOut());
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
          <Link className="navbar-left" to="/">
            <p className="navbar-text">TextShare</p>
          </Link>
          <a href="#"
            onClick={::this._handleSignOutClick}
            className="navbar-text"
            style={{ float: "right" }}
          >
            Sign out
          </a>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(Navbar);
