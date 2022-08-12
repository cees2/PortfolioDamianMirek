import { createContext, useState, useReducer } from "react";
import { questionIndexManager, getQuizResult } from "./quiz-context-helpers";

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
      setCorrectAnswers((prevCorrectAnswers) => [
        ...prevCorrectAnswers,
        { id: i, answer: result.correct_answer },
      ])
    );
  };

  const getResult = () => getQuizResult(correctAnswers, answers);

  const resetQuizData = () => {
    setQuestions([]);
    indexDispatch({ type: "SETINDEX", payload: 0 });
    setAnswers([]);
    setCorrectAnswers([]);
  };

  const quizContext = {
    questions,
    indexOfQuestion,
    answers,
    correctAnswers,
    getResult,
    setAnswer,
    indexDispatch,
    getQuestion,
    setAllQuestions,
    resetQuizData,
  };

  return (
    <QuizContext.Provider value={quizContext}>
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
