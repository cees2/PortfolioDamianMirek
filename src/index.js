import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TaskContextProvider } from "./store/tasks-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TaskContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TaskContextProvider>
);
