import React, { useRef, useContext, useState } from "react";
import classes from "./SortTasks.module.css";
import TaskContext from "../../store/tasks-context";

const SortTasks = (props) => {
  const [arrowPosition, setArrowPosition] = useState(0); // 0 --> up, 1 --> down
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
      .sort((curElement, nextElement) => {
        return !arrowPosition
          ? nextElement - curElement
          : curElement - nextElement;
      })
      .flatMap((date) =>
        tasks.filter((task) => new Date(task.date).getTime() === date)
      );

  const sortByPriority = () => {
    return tasks
      .map((task) => {
        const { priority } = task;
        if (priority === "High") return { ...task, priorityValue: 3 };
        else if (priority === "Medium") return { ...task, priorityValue: 2 };
        else return { ...task, priorityValue: 1 };
      })
      .sort((curElement, nextElement) =>
        arrowPosition
          ? curElement.priorityValue - nextElement.priorityValue
          : nextElement.priorityValue - curElement.priorityValue
      )
      .map((task) => {
        return {
          date: task.date,
          id: task.id,
          priority: task.priority,
          userId: task.userId,
          task: task.task,
        };
      });
  };

  const sortHandler = () => {
    const sortDecision = sortRef.current.value;

    setArrowPosition((prevPos) => ++prevPos % 2);
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
        <option value="date" defaultValue>
          Date
        </option>
        <option value="alphabet">Alphabet</option>
        <option value="priority">Priority</option>
      </select>
      <button className={classes.order} onClick={changeSortOrderHandler}>
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
