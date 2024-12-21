import React from "react";
import Option from "../../Option/Option";
import Input from "../../Input/Input";
import "./question.css";
import { useQuiz } from "../../../Context/QuizContext";

const Question = () => {
  const {questions, currentQuestion} = useQuiz()
  const question = questions[currentQuestion];
  return (
    <div className="question-container">
      <h6 className="questionText">
        {question.question}{" "}
        <span style={{ fontSize: "14px", fontWeight: 100, marginLeft: "1rem" }}>
          (points : {question.points})
        </span>
      </h6>{" "}
      {question.options?.length > 0 && (
        <ul className="optionList">
          {question.options.map((option, index) => (
            <Option
              option={option}
              key={index}
              index={index}
              rightAnswer={question.answer}
            />
          ))}
        </ul>
      )}
      {!question.options && (
        <div className="inputDiv">
          <Input
            label="Your Answer"
            placeholder="Enter Your Answer..."
            rightAnswer={question.answer}
          />
        </div>
      )}
    </div>
  );
};

export default Question;
