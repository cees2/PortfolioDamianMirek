import classes from "./QuizContent.module.css";
import Answer from "./Answer";
import QuizContext from "../../store/quiz-context";
import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import Error from "../UI/Error";
import QuizNavigation from "./Quiz-Navigation/QuizNavigation";

const QuizContent = (props) => {
  const [modalIsClosed, setModalIsClosed] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  const quizCtx = useContext(QuizContext);

  const answers = [
    quizCtx.questions[quizCtx.indexOfQuestion].correct_answer,
    ...quizCtx.questions[quizCtx.indexOfQuestion].incorrect_answers,
  ];

  const { question } = quizCtx.questions[quizCtx.indexOfQuestion];
  let givenAnswer;

  useEffect(() => {
    if (quizCtx.answers.length !== 10 && !modalIsClosed) {
      setError("Some questions are not answered.");
    }
  }, [modalIsClosed, quizCtx.answers.length]);

  const switchQuestion = (nextQuestion = true) => {
    if (nextQuestion) quizCtx.indexDispatch({ type: "INCREMENT" });
    else quizCtx.indexDispatch({ type: "DECREMENT" });
  };

  const switchQuestionHandler = (e, nextQuestion = true) => {
    e.preventDefault();
    quizCtx.setAnswer(givenAnswer, quizCtx.indexOfQuestion);
    switchQuestion(nextQuestion);
  };

  const nextQuestionHandler = (e) => switchQuestionHandler(e);

  const prevQuestionHandler = (e) => switchQuestionHandler(e, false);

  const showModal = (e) => {
    e.preventDefault();
    if (quizCtx.answers.length < 9) {
      setError("Some questions are not answered.");
      return;
    }
    quizCtx.setAnswer(givenAnswer, quizCtx.indexOfQuestion);
    setModalIsClosed(false);
  };

  const finishQuizHandler = () => {
    history.replace("/quiz/quizResult");
  };

  const hideModal = () => {
    setModalIsClosed(true);
  };

  const getAnswerValue = (answer) => (givenAnswer = answer);

  const modal = ReactDOM.createPortal(
    <ConfirmationModal
      onConfirm={finishQuizHandler}
      onReject={hideModal}
      message="Are you sure you want to complete this quiz?"
    />,
    document.getElementById("confirmation-modal")
  );

  const prevButtonClass =
    quizCtx.indexOfQuestion === 0 ? `${classes.hideNaviButton}` : ``;

  return (
    <div className={classes.quizQuestionsWrapper}>
      <QuizNavigation />
      <Card class={classes.quizContentWrapper}>
        {!modalIsClosed && modal}
        <h1 className={classes.quizQuestion}>{question}</h1>
        <form className={classes.singleQuestionForm}>
          {answers.map((answer, i) => (
            <Answer
              singleAnswer={answer}
              key={i}
              id={i}
              onMarked={getAnswerValue}
            />
          ))}
          <div className={classes.navigationButtons}>
            <button className={prevButtonClass} onClick={prevQuestionHandler}>
              Previous question
            </button>

            {!(quizCtx.indexOfQuestion === 9) && (
              <button onClick={nextQuestionHandler}>Next question</button>
            )}
            {quizCtx.indexOfQuestion === 9 && (
              <button onClick={showModal}>Finish Quiz</button>
            )}
          </div>
        </form>
      </Card>
      <div
        className={`${classes.errorBanner} ${
          error ? `${classes.activeErrorBanner}` : ""
        }`}
      >
        {error && <Error errorMessage="Some questions are not answered" />}
      </div>
    </div>
  );
};

export default QuizContent;
