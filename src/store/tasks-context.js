import { createContext, useState, useContext, useCallback } from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "./auth-context";

const TaskContext = createContext({
  tasks: [],
  setTasks: (tasks) => {},
  addTask: (task) => {},
  removeTask: (id) => {},
  getUsersTasks: () => {},
});

export const TaskContextProvider = (props) => {
  const [tasksToDo, setTasksToDo] = useState([]);
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthContext);

  const getUsersTasks = useCallback(async () => {
    const updatedTaskList = await sendRequest({
      url: "users/getMyTasks",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    });
    setTasksToDo(updatedTaskList.data.tasks);
  }, [authCtx.token, sendRequest]);

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

    await getUsersTasks();
  };

  const removeTask = async (taskId) => {
    await sendRequest({
      url: `tasks/${taskId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    });

    await getUsersTasks();
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
