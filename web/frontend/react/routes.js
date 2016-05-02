import React from "react";
import { IndexRoute, Route } from "react-router";
import { HomeView, DocumentsView, DocumentView, RegistrationsNew } from "views"

export default () => {
  return (
    <Route path="/" component={HomeView}>
      <Route path="/docs" component={DocumentsView}></Route>
      <Route path="/docs/:documentId" component={DocumentView}></Route>
      <Route path="/sign_up" component={RegistrationsNew}></Route>
    </Route>
  )
}
