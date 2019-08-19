/* Library Imports */
import * as React from "react";
import { render } from "react-dom";

/* Redux Imports */
import { Provider } from "react-redux";
import configureStore from "./store/createStore";

/* Component Imports */
import App from "./App";

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("react-entry")
);
