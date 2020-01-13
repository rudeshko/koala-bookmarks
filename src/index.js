import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import DndBackend from "react-dnd-html5-backend";

import "./sass/_reset.scss";

import App from "./components/App";

ReactDOM.render(
  <DndProvider backend={DndBackend}>
    <App />
  </DndProvider>,
  document.getElementById("root")
);
