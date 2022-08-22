import { useEffect, useRef, useContext } from "react";
import classes from "./Answer.module.css";
import QuizContext from "../../store/quiz-context";

const Answer = (props) => {
  const radioInputRef = useRef();
  const quizCtx = useContext(QuizContext);
  const charOfAnswer =
    props.id === 0 ? "A" : props.id === 1 ? "B" : props.id === 2 ? "C" : "D";
  const answer = `Ans ${charOfAnswer}`;

  const getAnswer = () => {
    props.onMarked(props.singleAnswer);
  };

  useEffect(() => {
    const input = radioInputRef.current;
    input.checked = false;
    if (
      quizCtx.answers.some(
        (ans) =>
          ans.givenAnswer === props.singleAnswer &&
          ans.id === quizCtx.indexOfQuestion
      )
    )
      input.checked = true;
  });

  return (
    <div className={classes.singleAnswer}>
      <input
        type="radio"
        id={answer}
        value={answer}
        name="quizAnswer"
        onChange={getAnswer}
        ref={radioInputRef}
      />
      <label htmlFor={answer}>{props.singleAnswer}</label>
    </div>
  );
};

export default Answer;
