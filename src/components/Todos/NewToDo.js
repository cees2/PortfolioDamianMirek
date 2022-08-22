import React, { Fragment } from "react";
import classes from "./NewToDo.module.css";
import { useRef, useState } from "react";
import { useContext } from "react";
import TaskContext from "./../../store/tasks-context";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Error from "../UI/Error";

const NewToDo = () => {
  const [error, setError] = useState(null);
  const [taskAdded, setTaskAdded] = useState(false);
  const [bannerTimeout, setBannerTimeout] = useState(null);
  const taskRef = useRef();
  const priorityRef = useRef();
  const taskCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      taskCtx.tasks.some(
        (singleTask) =>
          singleTask.task.toUpperCase() === taskRef.current.value.toUpperCase()
      )
    ) {
      setError("This task already exists.");
      return;
    } else if (taskRef.current.value.trim() === "") {
      setError("You can't add empty task.");
      return;
    } else {
      setTaskAdded(true);
      setError(false);
      const dataToBeSent = {
        id: Math.random(),
        userId: authCtx.userLocalId,
        task:
          taskRef.current.value.slice(0, 1).toUpperCase() +
          taskRef.current.value.slice(1),
        priority: priorityRef.current.value,
        date: new Date(),
      };
      taskCtx.addTask(dataToBeSent);
      taskRef.current.value = "";
      if (bannerTimeout) clearTimeout(bannerTimeout);
      setBannerTimeout(setTimeout(() => setTaskAdded(false), 6000));
    }
  };

  const bannerClasses = `${classes.taskAddedBanner} ${
    taskAdded && !error ? classes.activeBanner : ""
  }`;
  return (
    <Fragment>
      {taskAdded && (
        <div className={bannerClasses}>
          <img
            src={require("../../pictures/task_added.png")}
            alt="Success icon"
          />
          <p className={classes.taskAdded}>
            Task has been successfully added.
            <br />
            <Link to="/toDoApp" className={classes.seeTasksLink}>
              See my tasks.
            </Link>
          </p>
        </div>
      )}
      <Card class={classes.taskInput}>
        <form onSubmit={formSubmitHandler}>
          <div className={classes.taskToDo}>
            <label htmlFor="task">Task</label>
            <input type="text" id="task" ref={taskRef} />
            {error && <Error errorMessage={error} />}
          </div>
          <div className={classes.option}>
            <label htmlFor="option">Priority</label>
            <select className={classes.optionInput} ref={priorityRef}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button className={classes.submitButton}>Add task</button>
        </form>
      </Card>
    </Fragment>
  );
};

export default NewToDo;
