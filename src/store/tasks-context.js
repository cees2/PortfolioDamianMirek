import { createContext, useState } from "react";

const TaskContext = createContext({
  //{id: 1, task: 'sss', priority: 'Low', userId: 'dsadsadsadsa'}
  tasks: [],
  setTasks: (tasks) => {},
  addTask: (task) => {},
  removeTask: (id) => {},
});

export const TaskContextProvider = (props) => {
  const [tasksToDo, setTasksToDo] = useState([]);

  const addTask = (taskToAdd) => {
    console.log(taskToAdd);
    setTasksToDo((prevTasks) => [...prevTasks, taskToAdd]);
    fetch(
      "https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo.json",
      {
        method: "POST",
        body: JSON.stringify(taskToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const removeTask = (taskId, id) => {
    fetch(
      `https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo/${taskId}.json`,
      {
        method: "DELETE",
      }
    );

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
  };

  return (
    <TaskContext.Provider value={taskContext}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
