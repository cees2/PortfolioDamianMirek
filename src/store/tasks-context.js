import { createContext, useState, useContext, useCallback } from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "./auth-context";

const TaskContext = createContext({
  tasks: [],
  setTasks: (tasks) => {},
  addTask: (task) => {},
  removeTask: (id) => {},
});

export const TaskContextProvider = (props) => {
  const [tasksToDo, setTasksToDo] = useState([]);
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthContext);

  const getUsersTasks = useCallback(
    async () =>
      await sendRequest({
        url: "users/getMyTasks",
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      }),
    [authCtx.token, sendRequest]
  );

  const addTask = async (taskToAdd) => {
    await sendRequest({
      url: "tasks/",
      method: "POST",
      body: taskToAdd,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    });

    const updatedTaskList = await getUsersTasks();

    setTasksToDo(updatedTaskList.data.tasks);
  };

  const removeTask = async (taskId, id) => {
    await sendRequest({
      url: `tasks/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    });

    setTasksToDo((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const setTasks = (tasks) => {
    setTasksToDo(tasks);
  };

  const taskContext = {
    tasks: tasksToDo,
    setTasks,
    addTask,
    removeTask,
    getUsersTasks,
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
