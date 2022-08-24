import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import TaskContext from "./store/tasks-context";
import AuthContext from "./store/auth-context";
import Quiz from "./pages/Quiz";
import Tasks from "./pages/Tasks";
import Authentication from "./pages/Authentication";

function App() {
  const taskCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo.json"
      );

      if (!response.ok) throw new Error("Could not fetch data.");

      const responseData = await response.json();

      const usersTasks = [];

      for (const key in responseData) {
        if (responseData[key].userId === authCtx.userLocalId) {
          usersTasks.push(responseData[key]);
        }
      }
      taskCtx.setTasks(usersTasks);
    };

    fetchData();
  }, [authCtx.userLocalId]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        {token && (
          <Route path="/tasks">
            <Tasks />
          </Route>
        )}
        {!token && (
          <Route path="/authentication">
            <Authentication />
          </Route>
        )}
        {token && (
          <Route path="/quiz">
            <Quiz />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
