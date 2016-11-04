import React from "react";
import { IndexRoute, Route } from "react-router";
import { DocumentsView, DocumentView, RegistrationsNew, SessionsNew } from "views";
import AuthenticatedContainer from "containers/authenticated";

export default () => {
  return (
    <div>
    <Route path="/" component={AuthenticatedContainer}>
    </Route>
    </div>
  )
}
