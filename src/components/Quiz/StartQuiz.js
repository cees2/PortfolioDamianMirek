import React, { Fragment, useState } from "react";
import classes from "./StartQuiz.module.css";
import QuizContent from "./QuizContent";

const StartQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuizHandler = () => {
    setQuizStarted(true);
  };

  return (
    <Fragment>
      <h1 className={classes.quizHeader}>JavaScript Quiz</h1>
      <div className={classes.quizMainWrapper}>
        <img
          src={require(`../../pictures/javascript_logo.png`)}
          alt="javascript logo"
        />
        <div className={classes.quizImageAndDescription}>
          <p className={classes.quizDescription}>
            According to stack overflow JavaScript is the most commonly-used
            programming language in the whole world (69.7%). Its deep
            understanding of highly valuable nowadays. Take the following quiz
            and check your knowledge.
          </p>
          <button
            className={classes.startQuizButton}
            onClick={startQuizHandler}
          >
            Take quiz
          </button>
        </div>
      </div>
      {quizStarted && <QuizContent />}
    </Fragment>
  );
};

export default StartQuiz;
