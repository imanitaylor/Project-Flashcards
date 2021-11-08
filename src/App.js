import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NoMatch from "./NoMatch";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
