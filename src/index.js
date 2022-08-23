import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TaskContextProvider } from "./store/tasks-context";
import { AuthContextProvider } from "./store/auth-context";
import { QuizContextProvider } from "./store/quiz-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuizContextProvider>
    <AuthContextProvider>
      <TaskContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskContextProvider>
    </AuthContextProvider>
  </QuizContextProvider>
);
