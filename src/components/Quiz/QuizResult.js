import classes from "./QuizResult.module.css";
import QuizContext from "../../store/quiz-context";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const QuizResult = () => {
  const [score, setScore] = useState(0);
  const quizCtx = useContext(QuizContext);
  const history = useHistory();

  // useEffect(() => {
  //   const scoreTemp = 20;

  //   const checkEnd = () => {
  //     console.log(score, scoreTemp);
  //     if (score === scoreTemp) clearInterval(updateScoreInterval);
  //   };

  //   const updateScoreInterval = setInterval(() => {
  //     checkEnd();
  //     setScore((prevScore) => ++prevScore);
  //   }, 50);
  // }, [quizCtx, score]);

  const anotherQuizHandler = () => {
    quizCtx.resetQuizData();
    history.replace("/JSQuizStartPage");
  };

  const endQuizzingHandler = () => {
    quizCtx.resetQuizData();
    history.replace("/home");
  };

  return (
    <section className={classes.quizResultWrapper}>
      <h2 className={classes.quizResultHeader}>Your result:</h2>
      <div className={classes.score}>
        <div className={classes.result} style={{ width: `${score}%` }}>
          <p className={classes.quizScoreParagraph}>{`${score}%`}</p>
        </div>
      </div>
      <div className={classes.quizResultButtons}>
        <button onClick={endQuizzingHandler}>End quizzing</button>
        <button onClick={anotherQuizHandler}>Take another quiz</button>
      </div>
    </section>
  );
};

export default QuizResult;
