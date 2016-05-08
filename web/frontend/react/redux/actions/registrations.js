import { browserHistory } from "react-router";
import { httpPost } from "../../utils";

const Actions = {};

Actions.signUp = (data) => {
  return dispatch => {
    httpPost("/api/v1/registrations", {user: data})
    .then((data) => {
      localStorage.setItem("phoenixAuthToken", data.jwt);

      dispatch({
        type: "REGISTRATION_SUCCEEDED",
        errors: null,
      });

      dispatch({
        type: "CURRENT_USER",
        currentUser: data.user,
      });

      browserHistory.push("/");
    })
    .catch((error) => {
      error.response.json()
      .then((errorJSON) => {
        dispatch({
          type: "REGISTRATION_ERROR",
          errors: errorJSON.errors,
        });
      });
    });
  };
};

export default Actions;
