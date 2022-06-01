import classes from "./SingleToDo.module.css";
import { useContext } from "react";
import TaskContext from "../../store/tasks-context";

const SingleToDo = (props) => {
  const taskCtx = useContext(TaskContext);

  const deleteTask = () => {
    let idOfItemInDatabase;
    fetch(
      "https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo.json"
    )
      .then((response) => response.json())
      .then((responseData) => {
        for (const key in responseData) {
          if (responseData[key].id === props.id) {
            idOfItemInDatabase = key;
            taskCtx.removeTask(idOfItemInDatabase, props.id);
          }
        }
      });
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
