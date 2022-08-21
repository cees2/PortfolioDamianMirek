import classes from "./QuizResult.module.css";
import QuizContext from "../../store/quiz-context";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";

const MESSAGES = [
  { score: 0, message: "Poor result, start learning and try again." },
  { score: 20, message: "Could have been better." },
  { score: 40, message: "Refresh your knowlegde and try again." },
  {
    score: 60,
    message: "Good job, keep learning and you will become a master",
  },
  { score: 80, message: "Not bad, almost there." },
  { score: 100, message: "Excellent, your are a true techie" },
];

const QuizResult = () => {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const quizCtx = useContext(QuizContext);
  const history = useHistory();
  const result = quizCtx.getResult();

  useEffect(() => {
    if (score !== result) {
      setTimeout(() => setScore((prevScore) => prevScore + 5), 100);
    } else {
      console.log("exec");
      const quizResultMessage = MESSAGES.reduce(
        (acc, message) =>
          result === message.score || result === message.score - 10
            ? message.message
            : acc + "",
        ""
      );
      setMessage(quizResultMessage);
    }
  }, [score, result]);

  const anotherQuizHandler = () => {
    quizCtx.resetQuizData();
    history.replace("/JSQuizStartPage");
  };

  const endQuizzingHandler = () => {
    quizCtx.resetQuizData();
    history.replace("/home");
  };

  return (
    <Card class={classes.quizResultWrapper}>
      <h2 className={classes.quizResultHeader}>Your result:</h2>
      <div className={classes.score}>
        <div
          className={classes.result}
          style={{
            width: `${score}%`,
            backgroundColor: `rgb(${Math.floor(255 - score * 2)}, ${Math.floor(
              score * 2
            )}, 0)`,
          }}
        >
          <p className={classes.quizScoreParagraph}>{`${score}%`}</p>
        </div>
      </div>
      {message && <p className={classes.quizResultMessage}>{message}</p>}
      <div className={classes.quizResultButtons}>
        <button onClick={endQuizzingHandler}>End quizzing</button>
        <button onClick={anotherQuizHandler}>Take another quiz</button>
      </div>
    </Card>
  );
};

export default QuizResult;
