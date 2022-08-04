import React, { useRef, useContext, useState } from "react";
import classes from "./SortTasks.module.css";
import TaskContext from "../../store/tasks-context";

const SortTasks = (props) => {
  const [arrowPosition, setArrowPosition] = useState(0); // 0 --> up, 1 --> down
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const sortRef = useRef();
  const taskCtx = useContext(TaskContext);
  const tasks = taskCtx.tasks;

  const sortByAlphabet = () => {
    const tasksName = tasks.map((task) => task.task).sort();

    if (!arrowPosition) tasksName.reverse();

    return tasksName.flatMap((task) => {
      const curTask = task;
      return tasks.filter((task) => task.task === curTask);
    });
  };
  const sortByDate = () =>
    taskCtx.tasks
      .map((task) => new Date(task.date).getTime())
      .sort((a, b) => {
        return !arrowPosition ? b - a : a - b;
      })
      .flatMap((date) =>
        tasks.filter((task) => new Date(task.date).getTime() === date)
      );

  const sortByPriority = () => {
    const highPriorityTask = tasks.filter((task) => task.priority === "High");
    const mediumPriorityTask = tasks.filter(
      (task) => task.priority === "Medium"
    );
    const lowPriorityTask = tasks.filter((task) => task.priority === "Low");
    return arrowPosition
      ? [...lowPriorityTask, ...mediumPriorityTask, ...highPriorityTask]
      : [...highPriorityTask, ...mediumPriorityTask, ...lowPriorityTask];
  };

  const sortHandler = () => {
    const sortDecision = sortRef.current.value;
    if (!sortDecision) {
      setButtonDisabled(true);
      return;
    }
    setArrowPosition((prevPos) => ++prevPos % 2);
    setButtonDisabled(false);
    if (sortDecision === "alphabet") {
      props.onTasksSorted(sortByAlphabet());
    } else if (sortDecision === "priority") {
      props.onTasksSorted(sortByPriority());
    } else if (sortDecision === "date") {
      props.onTasksSorted(sortByDate());
    }
  };

  const changeSortOrderHandler = (e) => {
    if (!e.target.classList.contains(`${classes.sortArrow}`)) return;
    e.target.className = `${
      e.target.classList.contains(`${classes.rotateArrow}`)
        ? ""
        : classes.rotateArrow
    } ${classes.sortArrow}`;
    sortHandler();
  };

  return (
    <div className={classes.sortWrapper}>
      <label htmlFor="sort" className={classes.sortLabel}>
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        onChange={sortHandler}
        className={classes.selectSort}
        ref={sortRef}
      >
        <option defaultValue></option>
        <option value="alphabet">Alphabet</option>
        <option value="priority">Priority</option>
        <option value="date">Date</option>
      </select>
      <button
        className={classes.order}
        onClick={changeSortOrderHandler}
        disabled={buttonDisabled}
      >
        <img
          src={require("../../pictures/up_arrow.png")}
          alt="Up arrow"
          className={classes.sortArrow}
        />
      </button>
    </div>
  );
};

export default SortTasks;
