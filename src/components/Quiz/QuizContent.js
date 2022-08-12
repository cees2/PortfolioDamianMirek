import classes from "./QuizContent.module.css";
import Answer from "./Answer";
import QuizContext from "../../store/quiz-context";
import React, { Fragment, useContext, useState } from "react";
import ReactDOM from "react-dom";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useHistory } from "react-router-dom";

const QuizContent = (props) => {
  const [modalIsClosed, setModalIsClosed] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  const quizCtx = useContext(QuizContext);
  const { question } = props;
  const answers = [...question.incorrect_answers, question.correct_answer];
  let givenAnswer;

  const switchQuestionHandler = (e, nextQuestion = true) => {
    e.preventDefault();

    quizCtx.setAnswer(givenAnswer, quizCtx.indexOfQuestion);
    props.onSwitchQuestion(nextQuestion);
  };

  const nextQuestionHandler = (e) => switchQuestionHandler(e);

  const prevQuestionHandler = (e) => switchQuestionHandler(e, false);

  const showModal = (e) => {
    e.preventDefault();
    nextQuestionHandler(e);
    if (quizCtx.answers.length !== 10) {
      setError("Some questions are not answered.");
      return;
    }
    setModalIsClosed(false);
  };

  const finishQuizHandler = () => {
    history.replace("/quizResult");
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
    <Fragment>
      <section className={classes.quizContentWrapper}>
        {!modalIsClosed && modal}
        <h1 className={classes.quizQuestion}>{question.question}</h1>
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
      </section>
      <div
        className={`${classes.errorBanner} ${
          error ? `${classes.activeErrorBanner}` : ""
        }`}
      >
        {error && <p className={`${classes.quizErrorMessage}`}>{error}</p>}
      </div>
    </Fragment>
  );
};

export default QuizContent;
