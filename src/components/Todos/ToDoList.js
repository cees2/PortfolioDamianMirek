import {  useContext } from "react";
import classes from "./ToDoList.module.css";
import SingleToDo from "./SingleToDo";
import TaskContext from "../../store/tasks-context";

const ToDoList = () => {
  const taskCtx = useContext(TaskContext);

  const content = taskCtx.tasks.length !== 0 ? taskCtx.tasks.map((task) => {
    return (
      <SingleToDo
        key={task.id}
        id={task.id}
        priority={task.priority}
        task={task.task}
      />
    );
  }) : <p className={classes.information}>No task here, add some.</p>;

  return (
    <div className={classes.listWrapper}>
      <ul className={classes.taskList}>
        {content}
      </ul>
    </div>
  );
};

export default ToDoList;
