import React from "react";
import ReactDOM from "react-dom";
import createStore from "redux/store";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import routes from "routes";
import DevTools from "components/DevTools";

global.jQuery = require("jquery")
require("bootstrap")

import "bootstrap/dist/css/bootstrap.css"
import "index.scss"

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        {routes()}
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById("main")
)
