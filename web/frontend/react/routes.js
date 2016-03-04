import React from "react"
import { IndexRoute, Route } from "react-router"
import Home from "views/Home"

export default () => {
  return (
    <Route path="/" component={ Home }></Route>
  )
}
