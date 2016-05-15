import React from "react"
import { IndexRoute, Route } from "react-router"
import { HomeView, DocumentsView } from "views"

export default () => {
  return (
    <Route path="/" component={HomeView}>
      <Route path="/docs" component={DocumentsView}></Route>
    </Route>
  )
}
