import classes from "./SingleQuestion.module.css";
import { useContext } from "react";
import QuizContext from "../../../store/quiz-context";

const SingleQuestion = (props) => {
  const quizCtx = useContext(QuizContext);
  const listItemClickHandler = () => {
    quizCtx.indexDispatch({ type: "SETINDEX", payload: props.id });
  };

  const listItemClasses = `${classes.quizNavigationItem} ${
    quizCtx.answers.some((answer) => answer.id === props.id) &&
    `${classes.questionAnswered}`
  } ${props.id === quizCtx.indexOfQuestion && `${classes.activeNaviItem}`}`;
  return (
    <li className={listItemClasses} onClick={listItemClickHandler}>
      {props.id + 1}
    </li>
  );
};

export default SingleQuestion;
