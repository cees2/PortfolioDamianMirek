import { createContext, useState, useReducer } from "react";

const QuizContext = createContext({
  questions: [],
  indexOfQuestion: 0,
  answers: [],
  correctAnswers: [],
  indexDispatch: (index) => {},
  setAnswer: (answer, id) => {},
  getQuestion: (questionId) => {},
  setAllQuestions: (questions) => {},
});

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

export const QuizContextProvider = (props) => {
  const [questions, setQuestions] = useState([]);
  const [indexOfQuestion, indexDispatch] = useReducer(questionIndexManager, 0);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const setAnswer = (answer, id) => {
    if (answer === undefined) return;
    const elementWithTheSameId = answers.findIndex((ans) => ans.id === id);
    if (elementWithTheSameId !== -1) {
      const newAnswersArray = answers;
      newAnswersArray.splice(elementWithTheSameId, 1);
      setAnswers((prevAnswers) => [...newAnswersArray]);
    }
    setAnswers((prevAnswers) => [...prevAnswers, { id, givenAnswer: answer }]);
  };

  const getQuestion = (questionId) => [
    ...questions.map((question) => question.id === questionId),
  ];

  const setAllQuestions = (questions) => {
    setQuestions((prevQuestions) => questions.results);
    questions.results.forEach((result, i) =>
      setCorrectAnswers(
        correctAnswers.push({ id: i, answer: result.correct_answer })
      )
    );
  };

  const quizContext = {
    questions,
    indexOfQuestion,
    answers,
    setAnswer,
    indexDispatch,
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
