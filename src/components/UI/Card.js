import classes from "./Card.module.css";

const Card = (props) => {
  const divClasses = `${classes.card} ${props.class}`
  return <div className={divClasses}>{props.children}</div>;
};

export default Card;