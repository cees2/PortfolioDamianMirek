import React, { Fragment, useEffect, useState, useContext } from "react";
import classes from "./StartQuiz.module.css";
import QuizContext from "../../store/quiz-context";
import QuizContent from "./QuizContent";
import QuizNavigation from "./Quiz-Navigation/QuizNavigation";

const StartQuiz = () => {
  const quizCtx = useContext(QuizContext);
  const [quizIsActive, setQuizIsActive] = useState(false);

  useEffect(() => {
    const getData = async function () {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard"
      );
      const data = await response.json();
      quizCtx.setAllQuestions(data);
    };
    getData();
    quizCtx.indexDispatch({ type: "SETINDEX", payload: 0 });
  }, []);

  const showQuizHandler = () => setQuizIsActive(true);

  const switchQuestion = (nextQuestion = true) => {
    if (nextQuestion) quizCtx.indexDispatch({ type: "INCREMENT" });
    else quizCtx.indexDispatch({ type: "DECREMENT" });
  };

  const startPage = (
    <Fragment>
      <h1 className={classes.quizHeader}>Computer Science Quiz</h1>
      <div className={classes.quizMainWrapper}>
        <img
          src={require(`../../pictures/computer_science_icon.png`)}
          alt="computer science logo"
        />
        <div className={classes.quizImageAndDescription}>
          <p className={classes.quizDescription}>
            Computer science is a fast-developing branch of industry. Without
            this kind of technology our world would be a totally different
            place. It makes our lives simpler and better. Deep undestanding of
            just a branch of computer science is highly valuable nowadays. Check
            out your knowledge with the following quiz.
          </p>
          {/* Opis do poprawy */}
          <button className={classes.startQuizButton} onClick={showQuizHandler}>
            Take quiz
          </button>
        </div>
      </div>
    </Fragment>
  );

  const quizContent = (
    <div className={classes.quizQuestionsWrapper}>
      <QuizNavigation />
      {quizCtx.questions?.length && (
        <QuizContent
          question={quizCtx.questions[quizCtx.indexOfQuestion]}
          onSwitchQuestion={switchQuestion}
        />
      )}
    </div>
  );

  return (
    <Fragment>
      {!quizIsActive && startPage}
      {quizIsActive && quizContent}
    </Fragment>
  );
};

export default StartQuiz;
