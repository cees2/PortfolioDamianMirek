import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../store/auth-context";
import ToDoList from "../components/Todos/ToDoList";
import NewToDo from "../components/Todos/NewToDo";

const Tasks = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  return (
    <Switch>
      {token && (
        <Route path="/tasks/newToDo">
          <NewToDo />
        </Route>
      )}
      {token && (
        <Route path="/tasks/toDoApp">
          <ToDoList />
        </Route>
      )}
    </Switch>
  );
};

export default Tasks;
