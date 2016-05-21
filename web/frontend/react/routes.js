import React from "react";
import { IndexRoute, Route } from "react-router";
import { DocumentsView, DocumentView, RegistrationsNew, SessionsNew } from "views";
import AuthenticatedContainer from "containers/authenticated";

export default () => {
  return (
    <div>
    <Route path="/" component={AuthenticatedContainer}>
      <Route path="/docs" component={DocumentsView}></Route>
      <Route path="/docs/:documentId" component={DocumentView}></Route>
    </Route>
    <Route path="/sign_up" component={RegistrationsNew}></Route>
    <Route path="/sign_in" component={SessionsNew}></Route>
    </div>
  )
}
