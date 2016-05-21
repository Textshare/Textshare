import React from "react"
import { connect } from "react-redux"
import Actions from "../redux/actions/sessions"
import { browserHistory } from "react-router"
import Navbar from "components/Navbar"

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    const phoenixAuthToken = localStorage.getItem("phoenixAuthToken");

    if (phoenixAuthToken && !currentUser) {
      dispatch(Actions.currentUser());
    } else if (!phoenixAuthToken) {
      browserHistory.push("/sign_in");
    } else {
      browserHistory.push("/docs");
    }
  }

  render() {
    const { currentUser, dispatch } = this.props;

    if (!currentUser) return false;

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

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(AuthenticatedContainer);
