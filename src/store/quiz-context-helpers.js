export const questionIndexManager = (state, action) => {
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

export const getQuizResult = (correctAnswers, usersAnswers) => {
  return (
    correctAnswers.filter((corAns) =>
      usersAnswers.some((ans) => corAns.answer === ans.givenAnswer)
    ).length * 10
  ); // do poprawy
};
