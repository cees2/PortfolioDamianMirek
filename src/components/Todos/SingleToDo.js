import classes from "./SingleToDo.module.css";
import { useContext } from "react";
import TaskContext from "../../store/tasks-context";

const SingleToDo = (props) => {
  const taskCtx = useContext(TaskContext);

  const deleteTask = () => {
    taskCtx.removeTask(props.id);
  };

  return (
    <li className={classes.taskListItem}>
      <h2>{props.task}</h2>
      <p className={classes.priority}>{props.priority}</p>
      <button onClick={deleteTask}>Delete task</button>
    </li>
  );
};

export default SingleToDo;
