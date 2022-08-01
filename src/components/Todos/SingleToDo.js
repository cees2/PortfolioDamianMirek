import classes from "./SingleToDo.module.css";

const SingleToDo = (props) => {
  const deleteTask = () => {
    props.onDeleteTask(props.id);
  };

  return (
    <li className={classes.taskListItem}>
      <div className={classes.content}>
        <h2>{props.task}</h2>
        <div className={classes.details}>
          <p className={classes.priority}>{props.priority}</p>
          <p className={classes.addDate}>
            {new Intl.DateTimeFormat("pl-PL").format(new Date(props.date))}
          </p>
        </div>
      </div>
      <button onClick={deleteTask} className={classes.deleteTaskButton}>
        <img
          src={require(`../../pictures/bin.png`)}
          alt="bin"
          className={classes.binIcon}
        />
        <p>Delete task</p>
      </button>
    </li>
  );
};

export default SingleToDo;
