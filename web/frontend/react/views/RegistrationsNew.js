import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { renderErrorsFor } from "../utils";
import RegistrationActions from "redux/actions/registrations";
import SessionActions from "redux/actions/sessions"
import { browserHistory } from "react-router"


class RegistrationsNew extends React.Component {
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    const phoenixAuthToken = localStorage.getItem("phoenixAuthToken");

    if (phoenixAuthToken && currentUser) {
      browserHistory.push("/docs");
    } else if (phoenixAuthToken) {
      dispatch(SessionActions.currentUser());
    }
  }

  // componentDidMount() {
  //   const { dispatch, currentUser } = this.props;
  //   const phoenixAuthToken = localStorage.getItem("phoenixAuthToken");
  //
  //   if (phoenixAuthToken && !currentUser) {
  //     dispatch(SessionActions.currentUser());
  //   } else if (!phoenixAuthToken) {
  //     browserHistory.push("/sign_in");
  //   } else {
  //     browserHistory.push("/docs");
  //   }
  // }

  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    };

    dispatch(RegistrationActions.signUp(data));
  }


  render() {
    const { errors } = this.props;

    return (
      <div className="container-fluid">
        <div className="col-lg-4 col-md-3 col-sm-2 col-xs-1"></div>
        <div className="user-form col-lg-4 col-md-6 col-sm-8 col-sm-10">
          <form onSubmit={::this._handleSubmit}>
            <div className="form-group">
              <input className="form-control"
                ref="name" type="text" placeholder="Name" required={true} />
              <div style={{ color: "red" }}>
                {renderErrorsFor(errors, "name")}
              </div>
            </div>
            <div className="form-group">
              <input className="form-control"
                ref="email" type="email" placeholder="Email" required={true} />
              <div style={{ color: "red" }}>
                {renderErrorsFor(errors, "email")}
              </div>
            </div>
            <div className="form-group">
              <input className="form-control"
                ref="password" type="password" placeholder="Password" required={true} />
              <div style={{ color: "red" }}>
                {renderErrorsFor(errors, "password")}
              </div>
            </div>
            <div className="form-group">
              <input className="form-control"
                ref="passwordConfirmation" type="password" placeholder="Confirm password" required={true} />
              <div style={{ color: "red" }}>
                {renderErrorsFor(errors, "password_confirmation")}
              </div>
            </div>
            <button className="btn btn-default" type="submit">Sign up</button>
            <div style={{ marginTop: 10 }}>
              <Link to="/">I already have an account</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.registration.errors,
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(RegistrationsNew);
