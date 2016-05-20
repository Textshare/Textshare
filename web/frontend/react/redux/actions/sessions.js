import { Socket }                         from "phoenix";
import { httpGet, httpPost, httpDelete }  from "../../utils";
import { browserHistory } from "react-router";

function setCurrentUser(dispatch, user) {
  dispatch({
    type: "CURRENT_USER",
    currentUser: user,
  });
};

const Actions = {
  signIn: (email, password) => {
    return dispatch => {
      const data = {
        session: {
          email: email,
          password: password,
        },
      };

      httpPost("/api/v1/sessions", data)
      .then((data) => {
        localStorage.setItem("phoenixAuthToken", data.jwt);
        setCurrentUser(dispatch, data.user);
        browserHistory.push("/");
      })
      .catch((error) => {
        error.response.json()
        .then((errorJSON) => {
          dispatch({
            type: "SESSIONS_ERROR",
            error: errorJSON.error,
          });
        });
      });
    };
  },

  currentUser: () => {
    return dispatch => {
      httpGet("/api/v1/current_user")
      .then(function(data) {
        setCurrentUser(dispatch, data);
      })
      .catch(function(error) {
        browserHistory.push("/sign_in");
      });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete("/api/v1/sessions")
      .then((data) => {
        localStorage.removeItem("phoenixAuthToken");

        dispatch({
          type: "USER_SIGNED_OUT",
        });

        browserHistory.push("/sign_in");
      })
      .catch(function(error) {
        console.log(error);
      });
    };
  },
};

export default Actions;
