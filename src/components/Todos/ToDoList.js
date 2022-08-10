import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./ToDoList.module.css";
import SingleToDo from "./SingleToDo";
import TaskContext from "../../store/tasks-context";
import SortTasks from "./SortTasks";
import ConfirmationModal from "./../UI/ConfirmationModal";

const ToDoList = () => {
  const [modalIsClosed, setModalIsClosed] = useState(true);
  const [itemToBeDeleted, setItemToBeDeleted] = useState("");
  const taskCtx = useContext(TaskContext);

  const sortTasks = (sortedTasks) => {
    taskCtx.setTasks(sortedTasks);
  };

  const hideModal = () => {
    setModalIsClosed(true);
  };

  const showModal = (itemId) => {
    setModalIsClosed(false);
    setItemToBeDeleted(itemId);
  };

  const deleteTaskHandler = () => {
    let idOfItemInDatabase;
    fetch(
      "https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo.json"
    )
      .then((response) => response.json())
      .then((responseData) => {
        for (const key in responseData) {
          if (responseData[key].id === itemToBeDeleted) {
            idOfItemInDatabase = key;
            taskCtx.removeTask(idOfItemInDatabase, itemToBeDeleted);
          }
        }
        setItemToBeDeleted("");
        setModalIsClosed(true);
      });
  };

  const content =
    taskCtx.tasks.length !== 0 ? (
      taskCtx.tasks.map((task) => {
        return (
          <SingleToDo
            key={task.id}
            id={task.id}
            priority={task.priority}
            task={task.task}
            date={task.date}
            onDeleteTask={showModal}
          />
        );
      })
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
      {taskCtx.tasks.length && <SortTasks onTasksSorted={sortTasks} />}
      <div className={classes.listWrapper}>
        <ul className={classes.taskList}>{content}</ul>
      </div>
    </React.Fragment>
  );
};

export default ToDoList;
