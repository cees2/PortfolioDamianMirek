import classes from "./QuizNavigation.module.css";
import QuizContext from "../../../store/quiz-context";
import { useContext } from "react";
import SingleQuestion from "./SingleQuestion";

const QuizNavigation = () => {
  const quizCtx = useContext(QuizContext);

  return (
    <ul className={classes.questionsNavigation}>
      {quizCtx.questions.map((result, i) => (
        <SingleQuestion key={Math.random()} id={i} />
      ))}
    </ul>
  );
};

export default QuizNavigation;
