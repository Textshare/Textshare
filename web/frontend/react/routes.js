import React from "react";
import { IndexRoute, Route } from "react-router";
import { HomeView, DocumentsView, DocumentView } from "views";
import AuthenticatedContainer from "containers/authenticated";
import RegistrationsNew from "views/RegistrationsNew";
import SessionsNew from "views/SessionsNew";

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
