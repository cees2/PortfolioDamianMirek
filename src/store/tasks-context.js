import { createContext, useState } from "react";

const TaskContext = createContext({
  //{id: 1, task: 'sss', priority: 'Low'}
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

  const removeTask = (id) => {
    fetch(
      "https://react-http-d03fd-default-rtdb.europe-west1.firebasedatabase.app/tasksToDo.json",
      {
        method: "DELETE",
        body: JSON.stringify(id),
      }
    );
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
