/* Library Imports */
import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Component Imports */
import Home from "./pages/Home";
import { Layout } from "./components/Layout";

/* Style Imports */
import "./scss/App.scss";

/* Type Imports */
import { Props } from "./types/react/app";

const history = createBrowserHistory();
class App extends React.Component<Props> {
  render() {
    return (
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
