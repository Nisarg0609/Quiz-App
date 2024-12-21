import { createContext, useContext, useReducer } from "react";
import reactQuestions from "../assets/data/questions.json";

// step 1 : create context object
const QuizContext = createContext();

// step 4 : create initial state and reducer function
const initialState = {
  questions: [],
  currentQuestion: 0,
  status: "fetched", // fetched, started, finished, showResult, error
  answer: null,
  points: 0,
  review: false,
};

let answers = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "started":
      answers = Array.from({ length: state.questions.length }, () => null);
      return {
        ...state,
        currentQuestion: 0,
        status: "started",
        answer: null,
        points: 0,
        review: false,
      };
    case "nextQuestion":
      if (answers[state.currentQuestion + 1] === null) {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          answer: null,
        };
      } else {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          answer: answers[state.currentQuestion + 1],
        };
      }
    case "previousQuestion":
      if (answers[state.currentQuestion - 1] === null) {
        return {
          ...state,
          currentQuestion: state.currentQuestion - 1,
          answer: null,
        };
      } else {
        return {
          ...state,
          currentQuestion: state.currentQuestion - 1,
          answer: answers[state.currentQuestion - 1],
        };
      }
    case "navigateQuestion":
      if (answers[action.payload] === null) {
        return {
          ...state,
          currentQuestion: action.payload,
          answer: null,
        };
      } else {
        return {
          ...state,
          currentQuestion: action.payload,
          answer: answers[action.payload],
        };
      }
    case "answer":
      answers[state.currentQuestion] = action.payload;
      return {
        ...state,
        answer: action.payload,
      };
    case "finished":
      let points = state.questions.reduce(
        (points, question, index) =>
          question.answer === answers[index]
            ? points + question.points
            : points,
        0
      );
      return {
        ...state,
        points: points,
        answer: null,
        status: "finished",
        currentQuestion: 0,
      };
    case "review":
      return {
        ...state,
        currentQuestion: 0,
        status: "review",
        answer: null,
        review: true,
      };
    default:
      throw new Error("Invalid action!");
  }
};

// step 2 : create custom context provider component
const QuizProvider = ({ children }) => {
  // step 5 : create useReducer
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    questions: reactQuestions.reactMultiChoiceQuestions,
  });

  // step 6 : derived states
  const currentQuestion = state.currentQuestion;
  const numOfQuestions = state.questions.length;
  const status = state.status;
  const answer = state.answer;
  const points = state.points;
  const review = state.review;
  const totalPoints = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  return (
    <QuizContext.Provider
    // step 7 : provide value
      value={{
        questions: state.questions,
        answers,
        currentQuestion,
        numOfQuestions,
        status,
        answer,
        points,
        review,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// step 3 : create custom context receiver hook
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("useQuiz is used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
