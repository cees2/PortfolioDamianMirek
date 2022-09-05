import classes from "./QuizNavigation.module.css";
import QuizContext from "../../../store/quiz-context";
import { useContext } from "react";
import SingleQuestion from "./SingleQuestion";

const QuizNavigation = (props) => {
  const quizCtx = useContext(QuizContext);

  return (
    <ul className={classes.questionsNavigation}>
      {quizCtx.questions.map((result, i) => (
        <SingleQuestion
          key={Math.random()}
          id={i}
          onNaviClick={props.onNaviClick}
        />
      ))}
    </ul>
  );
};

export default QuizNavigation;
