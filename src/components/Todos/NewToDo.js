import React from "react";
import classes from "./NewToDo.module.css";
import { useRef, useState } from "react";
import { useContext } from "react";
import TaskContext from "./../../store/tasks-context";

const NewToDo = () => {
  const [error, setError] = useState(null);
  const taskRef = useRef();
  const priorityRef = useRef();
  const taskCtx = useContext(TaskContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      taskCtx.tasks.some(
        (singleTask) =>
          singleTask.task.toUpperCase() === taskRef.current.value.toUpperCase()
      )
    ) {
      setError('This task already exists.');
      return;
    } else if (taskRef.current.value.trim() === "") {
      setError("You can't add empty task.");
      return;
    } else {
      setError(false);
      const dataToBeSend = {
        id: Math.random(),
        task: taskRef.current.value,
        priority: priorityRef.current.value,
      };
      taskCtx.addTask(dataToBeSend);
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.taskToDo}>
        <label htmlFor="task">Task</label>
        <input type="text" id="task" ref={taskRef} />
        {error && <p className={classes.errorInformation}>{error}</p>}
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
  );
};

export default NewToDo;
