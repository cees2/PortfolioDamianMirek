import classes from "./QuizContent.module.css";
import Answer from "./Answer";

const QuizContent = (props) => {
  const { question } = props;
  const answers = [...question.incorrect_answers, question.correct_answer];

  const nextQuestionHandler = (e) => {
    e.preventDefault(); // do poprawy
    props.onSwitchQuestion();
  };

  const prevQuestionHandler = (e) => {
    e.preventDefault();
    props.onSwitchQuestion(false);
  };

  return (
    <section className={classes.quizContentWrapper}>
      <h1 className={classes.quizQuestion}>{question.question}</h1>
      <form className={classes.singleQuestionForm}>
        {answers.map((answer, i) => (
          <Answer singleAnswer={answer} key={i} id={i} />
        ))}
        <div className={classes.navigationButtons}>
          <button
            className={classes.nextQuestion}
            onClick={prevQuestionHandler}
          >
            Previous question
          </button>
          <button
            className={classes.prevQuestion}
            onClick={nextQuestionHandler}
          >
            Next question
          </button>
        </div>
      </form>
    </section>
  );
};

export default QuizContent;
