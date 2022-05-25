import React from "react";
import classes from "./MainHeader.module.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import TaskContext from "../../store/tasks-context";

const MainHeader = () => {
  const taskCtx = useContext(TaskContext);
  const numberOfTasks = taskCtx.tasks.length;

  return (
    <header className={classes.header}>
      <div className={classes.portfolio}>
        <Link to="/home">Portfolio</Link>
      </div>
      <nav>
        <ul className={classes.headerList}>
          <li>
            <NavLink activeClassName={classes.active} to="/newToDo">
              Add task to do 
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/toDoApp">
              Tasks To Do {<span className={classes.numOfTasks}>{numberOfTasks}</span>}
            </NavLink>
          </li> 
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
