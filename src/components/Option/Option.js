import React from "react";
import "./option.css";
import { useQuiz } from "../../Context/QuizContext";
const Option = ({
  option,
  index,
  rightAnswer
}) => {
  const {review, answers, currentQuestion, dispatch} = useQuiz()
  return (
    <li
      className={`optionListItem ${
        review === true && answers[currentQuestion] === index
          ? answers[currentQuestion] === rightAnswer
            ? "right"
            : "wrong"
          : ""
      }  ${review === true ? "disabled" : ""} ${
        answers[currentQuestion] !== null
          ? answers[currentQuestion] === index
            ? "selected"
            : "not-selected"
          : "not-selected"
      }`}
      onClick={() => dispatch({ type: "answer", payload: index })}
    >
      {review === true && rightAnswer === index && <span className="RightTick">&#10004;</span>}
      <p className="optionText">{option}</p>
    </li>
  );
};

export default Option;
