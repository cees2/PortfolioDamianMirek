import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";
import classes from "./StartQuiz.module.css";
import QuizContext from "../../store/quiz-context";
import QuizContent from "./QuizContent";

const questionIndexManager = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (state === 9) return state;
      return ++state;
    case "DECREMENT":
      if (state === 0) return state;
      return --state;
    case "SETINDEX":
      return action.payload;
    default:
      return state;
  }
};

const StartQuiz = () => {
  const quizCtx = useContext(QuizContext);
  const [indexOfQuestion, indexDispatch] = useReducer(questionIndexManager, 0);
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
    indexDispatch({ type: "SETINDEX", payload: 0 });
  }, []);

  const showQuizHandler = () => setQuizIsActive(true);

  const switchQuestion = (nextQuestion = true) => {
    if (nextQuestion) indexDispatch({ type: "INCREMENT" });
    else indexDispatch({ type: "DECREMENT" });
  };

  const startPage = (
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
            understanding is highly valuable nowadays. Take the following quiz
            and check your knowledge.
          </p>
          <button className={classes.startQuizButton} onClick={showQuizHandler}>
            Take quiz
          </button>
        </div>
      </div>
    </Fragment>
  );

  return (
    <>
      {!quizIsActive && startPage}
      {quizIsActive && (
        <QuizContent
          question={quizCtx.questions.results[indexOfQuestion]}
          onSwitchQuestion={switchQuestion}
        />
      )}
    </>
  );
};

export default StartQuiz;
