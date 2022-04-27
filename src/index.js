import { StrictMode } from "react";
import ReactDOM from "react-dom";
import store from "./store";
import App2 from "./App2/App";
import { Provider } from "react-redux";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App2 />
    </StrictMode>
  </Provider>,
  rootElement
);
