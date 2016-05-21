import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { renderErrorsFor } from "utils";
import Actions from "redux/actions/sessions";
import "./SessionsNew.scss"

class SessionsNew extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.refs;
    const { dispatch } = this.props;

    dispatch(Actions.signIn(email.value, password.value));
  }

  _renderError() {
    const { error } = this.props;

    if (!error) return false;

    return (
      <div className="error">
        {error}
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-lg-4 col-md-3 col-sm-2 col-xs-1"></div>
        <div className="user-form col-lg-4 col-md-6 col-sm-8 col-sm-10">
          <div style={{ marginBottom: 10, color: "red" }}>
            {::this._renderError()}
          </div>
          <form onSubmit={::this._handleSubmit}>
            <div className="form-group">
              <input className="form-control" ref="email"
                type="Email" placeholder="Email" required="true"/>
            </div>
            <div className="form-group">
              <input className="form-control" ref="password"
                type="password" placeholder="Password" required="true"/>
            </div>
            <button className="btn btn-default" type="submit">Sign in</button>
          </form>
          <div style={{ marginTop: 10 }}>
            <Link to="/sign_up">Create new account</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.session
);

export default connect(mapStateToProps)(SessionsNew);
