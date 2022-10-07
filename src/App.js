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
    const getTasks = async () => {
      const taskList = await taskCtx.getUsersTasks();

      if (!taskList) return;
      taskCtx.setTasks(taskList.data.tasks);
    };
    getTasks();
  }, [taskCtx.getUsersTasks]);

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
        <Route path="/authentication">
          <Authentication />
        </Route>
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
