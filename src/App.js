import React, {useEffect, useContext } from "react";
import { Route, Switch, Redirect,} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TasksToDo from "./pages/TasksToDo";
import Layout from "./components/Layout/Layout";
import AddToDo from "./pages/AddToDo";
import TaskContext from "./store/tasks-context";

function App() {
  const taskCtx = useContext(TaskContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo.json"
      );
      const responseData = await response.json();

      const temp = [];

      for (const key in responseData) {
        temp.push(responseData[key]);
      }
      taskCtx.setTasks(temp);
    };

    fetchData();
  }, []); // do poprawy
  return (

    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/newToDo">
          <AddToDo />
        </Route>
        <Route path="/toDoApp">
          <TasksToDo />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
