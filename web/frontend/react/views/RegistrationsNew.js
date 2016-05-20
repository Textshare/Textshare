import React, {PropTypes} from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { renderErrorsFor } from "../utils";

import Actions from "redux/actions/registrations";

class RegistrationsNew extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    const data = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value,
    };

    dispatch(Actions.signUp(data));
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="view-container registrations new">
        <main>
          <header>
            <div className="logo" />
          </header>
          <form onSubmit={::this._handleSubmit}>
            <div className="field">
              <input ref="name" type="text" placeholder="Name" required={true} />
              {renderErrorsFor(errors, "name")}
            </div>
            <div className="field">
              <input ref="email" type="email" placeholder="Email" required={true} />
              {renderErrorsFor(errors, "email")}
            </div>
            <div className="field">
              <input ref="password" type="password" placeholder="Password" required={true} />
              {renderErrorsFor(errors, "password")}
            </div>
            <div className="field">
              <input ref="passwordConfirmation" type="password" placeholder="Confirm password" required={true} />
              {renderErrorsFor(errors, "password_confirmation")}
            </div>
            <button type="submit">Sign up</button>
            <Link to="/">Home</Link>
          </form>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.registration.errors,
});

export default connect(mapStateToProps)(RegistrationsNew);
