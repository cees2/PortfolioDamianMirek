import React, {
  useRef,
  useContext,
  useState,
  Fragment,
  useEffect,
  useCallback,
} from "react";
import classes from "./SortTasks.module.css";
import TaskContext from "../../store/tasks-context";

const SortTasks = (props) => {
  const [arrowPosition, setArrowPosition] = useState(0); // 0 --> up, 1 --> down
  const [searchTaskActive, setSearchTaskActive] = useState(false);
  const sortRef = useRef();
  const searchTaskRef = useRef();
  const taskCtx = useContext(TaskContext);
  const tasks = taskCtx.tasks;

  const sortByAlphabet = () => {
    const tasksName = tasks.map((task) => task.taskDescription).sort();

    if (!arrowPosition) tasksName.reverse();

    return tasksName.flatMap((task) => {
      const curTask = task;
      return tasks.filter((task) => task.taskDescription === curTask);
    });
  };

  const sortByDate = () =>
    tasks
      .map((task) => new Date(task.dateCreated).getTime())
      .sort((curElement, nextElement) => {
        return !arrowPosition
          ? nextElement - curElement
          : curElement - nextElement;
      })
      .flatMap((date) => {
        return tasks.filter(
          (task) => new Date(task.dateCreated).getTime() === date
        );
      });

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
          dateCreated: task.dateCreated,
          _id: task._id,
          priority: task.priority,
          userId: task._id,
          taskDescription: task.taskDescription,
        };
      });
  };

  const executeSorting = useCallback(
    (sortDecision) => {
      if (sortDecision === "alphabet") {
        taskCtx.setTasks(sortByAlphabet());
      } else if (sortDecision === "priority") {
        taskCtx.setTasks(sortByPriority());
      } else if (sortDecision === "date") {
        taskCtx.setTasks(sortByDate());
      }
    },
    [arrowPosition]
  );

  const sortHandler = (e, changedOrder = false) => {
    const sortDecision = sortRef.current.value;
    if (changedOrder) {
      setArrowPosition((prevPos) => ++prevPos % 2);
      return;
    } else if (sortDecision === "taskName") setSearchTaskActive(true);
    else setSearchTaskActive(false);

    executeSorting(sortDecision);
  };

  const changeSortOrderHandler = (e) => {
    if (!e.target.classList.contains(`${classes.sortArrow}`)) return;
    e.target.className = `${
      e.target.classList.contains(`${classes.rotateArrow}`)
        ? ""
        : classes.rotateArrow
    } ${classes.sortArrow}`;
    sortHandler(e, true);
  };

  const searchTaskHandler = () => {
    const searchInputRef = searchTaskRef.current.value;

    props.onSearchingTasks(
      tasks.filter((task) =>
        task.taskDescription
          .toUpperCase()
          .trim()
          .includes(searchInputRef.toUpperCase().trim())
      )
    );
  };

  useEffect(() => {
    const sortDecision = sortRef.current.value;
    executeSorting(sortDecision);
  }, [arrowPosition, executeSorting]);

  return (
    <Fragment>
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
          <option value="taskName">Task name</option>
        </select>
        <button
          className={classes.order}
          onClick={changeSortOrderHandler}
          disabled={searchTaskActive}
        >
          <img
            src={require("../../pictures/up_arrow.png")}
            alt="Up arrow"
            className={classes.sortArrow}
          />
        </button>
      </div>
      {searchTaskActive && (
        <div className={classes.searchTaskByName}>
          <label htmlFor="searchTaskInput" className={classes.searchTaskHeader}>
            Search task
          </label>
          <input
            type="text"
            id="searchTaskInput"
            onChange={searchTaskHandler}
            ref={searchTaskRef}
          />
        </div>
      )}
    </Fragment>
  );
};

export default SortTasks;
