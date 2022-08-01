import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TasksToDo from "./pages/TasksToDo";
import Layout from "./components/Layout/Layout";
import AddToDo from "./pages/AddToDo";
import TaskContext from "./store/tasks-context";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import AuthContext from "./store/auth-context";

function App() {
  const taskCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);
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
  }, [authCtx.userLocalId]); // do poprawy

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        {authCtx.token && (
          <Route path="/newToDo">
            <AddToDo />
          </Route>
        )}
        {authCtx.token && (
          <Route path="/toDoApp">
            <TasksToDo />
          </Route>
        )}
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/CreateAccount">
          <CreateAccount />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
