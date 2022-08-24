import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../store/auth-context";
import QuizContext from "../store/quiz-context";
import StartQuiz from "../components/Quiz/StartQuiz";
import QuizResult from "../components/Quiz/QuizResult";
import QuizContent from "../components/Quiz/QuizContent";

const Quiz = () => {
  const authCtx = useContext(AuthContext);
  const quizCtx = useContext(QuizContext);
  const { token } = authCtx;

  return (
    <Switch>
      <Route>
        {token && (
          <Route path="/quiz/quizStartPage">
            <StartQuiz />
          </Route>
        )}
        {token && quizCtx.correctAnswers.length === 10 && (
          <Route path="/quiz/quizContent">
            <QuizContent />
          </Route>
        )}
        {token && quizCtx.answers.length === 10 && (
          <Route path="/quiz/quizResult">
            <QuizResult />
          </Route>
        )}
      </Route>
    </Switch>
  );
};

export default Quiz;
