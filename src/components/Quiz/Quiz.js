import { useQuiz } from "../../Context/QuizContext";
import Navigation from "../Navigation/Navigation";
import QuestionsBox from "../QuestionsBox/QuestionsBox";
import Title from "../Title/Title";
import PropTypes from "prop-types";
import Progress from "../Progress/Progress";
import Points from "../Points/Points";
import Question from "../QuestionsBox/Question/Question";
import Button from "../Button/Button";
import Timer from "../Timer/Timer";
import NavigateQuestions from "../Navigation/NavigateQuestions/NavigateQuestions";
import Summary from "../Summary/Summary";
import "./quiz.css";

const Quiz = ({ title, showProgress, showPoints, navigation, summary }) => {
  // step 8 : read the provided context value using custom context receiver hook
  const {
    questions,
    status,
    dispatch,
    currentQuestion,
    numOfQuestions,
    review,
    points,
    totalPoints,
  } = useQuiz();

  return (
    <div className="quiz-container">
      <header className="transparentBox">
        <Title title={title} />
      </header>
      <main className="main-container">
        {(questions === undefined || questions?.length === 0 || questions === null) && (
          <h2 style={{ color: "red", marginBottom: "1rem" }}>
            Pass Questions array to Quiz component
          </h2>
        )}
        {questions && status === "fetched" && (
          <div className="startExam-container">
            <p>Welcome to THE REACT QUIZ</p>
            <Button onClick={() => dispatch({ type: "started" })}>START QUIZ</Button>
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
                      Question &nbsp;: &nbsp;{currentQuestion + 1}/{numOfQuestions}{" "}
                    </p>
                    <p>
                      {review ? points + " / " : ""} {totalPoints} &nbsp;Points
                    </p>
                  </Points>
                )}
              </div>
            )}

            <Question />
            <div className="button-container">
              <Button
                visibility={currentQuestion !== 0}
                onClick={() => dispatch({ type: "previousQuestion" })}
              >
                Prev
              </Button>
              {currentQuestion < numOfQuestions - 1 ? (
                <Button onClick={() => dispatch({ type: "nextQuestion" })}>Next</Button>
              ) : (
                <Button onClick={() => dispatch({ type: "finished" })}>
                  {review ? "Back to Results" : "Finish"}
                </Button>
              )}
            </div>
          </QuestionsBox>
        )}

        {questions && navigation && (status === "started" || status === "review") && (
          <Navigation>
            <NavigateQuestions />
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
            <Button onClick={() => dispatch({ type: "started" })}>RESTART QUIZ</Button>
            <Button onClick={() => dispatch({ type: "review" })}>REVIEW ANSWERS</Button>
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
