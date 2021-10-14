import React from "react";
import ReactDOM from "react-dom";
import { SendIssue } from "./SendIssue";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <SendIssue login={"frog"} password={"1234"} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
