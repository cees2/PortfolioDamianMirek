import classes from "./Answer.module.css";

const Answer = (props) => {
  const charOfAnswer =
    props.id === 0 ? "A" : props.id === 1 ? "B" : props.id === 2 ? "C" : "D";
  const answer = `Ans ${charOfAnswer}`;

  return (
    <div className={classes.singleAnswer}>
      <input type="radio" id={answer} value={answer} name="quizAnswer" />
      <label htmlFor={answer}>{props.singleAnswer}</label>
    </div>
  );
};

export default Answer;
