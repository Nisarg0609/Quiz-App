import Navigation from "../Navigation/Navigation";
import QuestionsBox from "../QuestionsBox/QuestionsBox";
import Title from "../Title/Title";
import PropTypes from "prop-types";
import Progress from "../Progress/Progress";
import Points from "../Points/Points";
import { useReducer } from "react";
import Question from "../QuestionsBox/Question/Question";
import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import NavigateQuestions from "../Navigation/NavigateQuestions/NavigateQuestions";
import "./quiz.css";
import Summary from "../Summary/Summary";

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
      console.log(points);
      return {
        ...state,
        points: points,
        answer: null,
        status: "finished",
        currentQuestion: 0,
      };
    case "review":
      console.log("review", answers);
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
const Quiz = ({
  title,
  questions,
  showProgress,
  showPoints,
  navigation,
  summary,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    questions: questions,
  });
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
  console.log(answers);
  return (
    <div className="quiz-container">
      <header className="transparentBox">
        <Title title={title} />
      </header>
      <main className="main-container">
        {(questions === undefined ||
          questions?.length === 0 ||
          questions === null) && (
          <h2 style={{ color: "red", marginBottom: "1rem" }}>
            Pass Questions array to Quiz component
          </h2>
        )}
        {questions && status === "fetched" && (
          <div className="startExam-container">
            <p>Welcome to THE REACT QUIZ</p>
            <Button onClick={() => dispatch({ type: "started" })}>
              START QUIZ
            </Button>
          </div>
        )}
        {questions && (status === "started" || status === "review") && (
          <QuestionsBox>
            {(showProgress || showPoints) && (
              <div className="question-progress">
                {showProgress && (
                  <Progress value={currentQuestion + 1} max={numOfQuestions} />
                )}
                {showPoints && (
                  <Points>
                    <p>
                      Question &nbsp;: &nbsp;{currentQuestion + 1}/
                      {numOfQuestions}{" "}
                    </p>
                    <p>{review ? points + ' / ' : ''}  {totalPoints} &nbsp;Points</p>
                  </Points>
                )}
              </div>
            )}

            <Question
              question={state.questions[currentQuestion]}
              answer={answer}
              onAnswer={dispatch}
              answers={answers}
              currentQuestion={currentQuestion}
              review={review}
            />
            <div className="button-container">
              <Button
                visibility={currentQuestion !== 0}
                onClick={() => dispatch({ type: "previousQuestion" })}
              >
                Prev
              </Button>
              {currentQuestion < numOfQuestions - 1 ? (
                <Button onClick={() => dispatch({ type: "nextQuestion" })}>
                  Next
                </Button>
              ) : (
                <Button onClick={() => dispatch({ type: "finished" })}>
                  {review ? "Back to Results" : "Finish"}
                </Button>
              )}
            </div>
          </QuestionsBox>
        )}

        {questions &&
          navigation &&
          (status === "started" || status === "review") && (
            <Navigation>
              <NavigateQuestions
                numOfItems={11}
                onNavigate={dispatch}
                answers={answers}
                review={review}
                currentQuestion={currentQuestion}
                questions={questions}
              />
              <Timer time={11 * 30} onTimerExpire={dispatch} />
            </Navigation>
          )}

        {status === "finished" && (
          <Summary
            summary={summary}
            title={title}
            points={points}
            totalPoints={totalPoints}
          >
            <Button onClick={() => dispatch({ type: "started" })}>
              RESTART QUIZ
            </Button>
            <Button onClick={() => dispatch({ type: "review" })}>
              REVIEW ANSWERS
            </Button>
          </Summary>
        )}
      </main>
    </div>
  );
};

Quiz.propTypes = {
  title: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      answer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      points: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["multiple-choice", "true/false", "blank"]),
    })
  ),
  progress: PropTypes.bool,
  points: PropTypes.bool,
  navigation: PropTypes.bool,
};

export default Quiz;
