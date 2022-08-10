import classes from "./QuizResult.module.css";

const QuizResult = () => {
  const endQuizHandler = () => {};

  const anotherQuizHandler = () => {};

  return (
    <div>
      <h2>Your result:</h2>
      <p>90%</p>
      <button onClick={endQuizHandler}>End quizzing</button>
      <button onClick={anotherQuizHandler}>Take another quiz</button>
    </div>
  );
};

export default QuizResult;
