import React, { useEffect, useState } from "react";
import { useQuiz } from "../../Context/QuizContext";
import "./input.css";

const Input = ({ label, placeholder, rightAnswer }) => {
  const { answer, dispatch, review } = useQuiz();
  const [input, setInput] = useState(answer ? answer : "");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: "answer", payload: input });
  }, [input, dispatch]);

  return (
    <div className="input-container">
      <div
        style={{ marginBottom: "2rem", display: "flex", alignItems: "center" }}
      >
        <label htmlFor={label} className="inputLabel">
          {label ? label : "Input"}
        </label>
        <input
          type="text"
          name="answer"
          id={label}
          className={`input ${review === true ? "disabled" : ""}`}
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
      {review === true && (
        <p
          style={{ fontSize: "22px" }}
          className={`${rightAnswer === answer ? "rightInput" : "wrongInput"}`}
        >
          Right Answer : {rightAnswer}
        </p>
      )}
    </div>
  );
};

export default Input;
