import { useQuiz } from "../../../Context/QuizContext";
import "./navigateQuestions.css";

const NavigateQuestions = () => {
  const {numOfQuestions, review, answers, questions, dispatch} = useQuiz()
  return (
    <div className="navigateQuestions-container">
      <p style={{ fontSize: "18px", marginBottom: "1rem" }}>
        Navigate Questions
      </p>
      <div className="navigateQuestions-box">
        {Array.from({ length: numOfQuestions }, (item, index) => (
          <li
            className={`navigationItem button ${
              review && (answers[index] !== null && answers[index] !== "")  
                ? questions[index].answer === answers[index] ? "right" : "wrong"
                : answers[index] !== null && answers[index] !== ""
                ? "selected"
                : "not-selected"
            }`}
            key={index}
            onClick={() =>
              dispatch({ type: "navigateQuestion", payload: index })
            }
          >
            <p>{index + 1}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default NavigateQuestions;
