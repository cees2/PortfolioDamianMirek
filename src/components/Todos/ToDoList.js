import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./ToDoList.module.css";
import SingleToDo from "./SingleToDo";
import TaskContext from "../../store/tasks-context";
import SortTasks from "./SortTasks";
import ConfirmationModal from "./../UI/ConfirmationModal";

const ToDoList = () => {
  const taskCtx = useContext(TaskContext);
  const [modalIsClosed, setModalIsClosed] = useState(true);
  const [tasksToRender, setTasksToRender] = useState(taskCtx.tasks);
  console.log("exec");

  useEffect(() => {
    setTasksToRender(taskCtx.tasks);
  }, [taskCtx.tasks]);

  const sortTasks = (sortedTasks) => {
    taskCtx.setTasks(sortedTasks); // do poprawy !!!!!
  };

  const hideModal = () => {
    setModalIsClosed(true);
  };

  const showModal = (itemId) => {
    setModalIsClosed(false);
  };

  const deleteTaskHandler = () => {
    setModalIsClosed(true);
  };

  const searchingTaskHandler = (tasksToBeRendered) => {
    setTasksToRender(tasksToBeRendered);
  };

  const content =
    tasksToRender.length !== 0 ? (
      tasksToRender.map((task) => {
        return (
          <SingleToDo
            key={task._id}
            id={task._id}
            priority={task.priority}
            task={task.taskDescription}
            date={task.dateCreated}
            onDeleteTask={showModal}
          />
        );
      })
    ) : tasksToRender.length === 0 && taskCtx.tasks.length !== 0 ? (
      <p className={classes.information}>Not a task matched your search.</p>
    ) : (
      <p className={classes.information}>Not a single task here, add some.</p>
    );

  return (
    <React.Fragment>
      {!modalIsClosed &&
        ReactDOM.createPortal(
          <ConfirmationModal
            onConfirm={deleteTaskHandler}
            onReject={hideModal}
            message="Are you sure you want to delete this task?"
          />,
          document.getElementById("confirmation-modal")
        )}
      {taskCtx.tasks.length && (
        <SortTasks
          onTasksSorted={sortTasks}
          onSearchingTasks={searchingTaskHandler}
        />
      )}
      <div className={classes.listWrapper}>
        <ul className={classes.taskList}>{content}</ul>
      </div>
    </React.Fragment>
  );
};

export default ToDoList;
