import { createContext, useState } from "react";

const QuizContext = createContext({
  questions: [],
  getQuestion: (questionId) => {},
  setAllQuestions: (questions) => {},
});

export const QuizContextProvider = (props) => {
  const [questions, setQuestions] = useState([]);

  const getQuestion = (questionId) => [
    ...questions.map((question) => question.id === questionId),
  ];

  const setAllQuestions = (questions) =>
    setQuestions((prevQuestions) => questions);

  const quizContext = {
    questions,
    getQuestion,
    setAllQuestions,
  };

  return (
    <QuizContext.Provider value={quizContext}>
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
