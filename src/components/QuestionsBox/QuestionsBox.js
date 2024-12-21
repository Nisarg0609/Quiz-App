import React from "react";
import "./questionsBox.css";

const QuestionsBox = ({ children }) => {
  return <div className="questionBox-container transparentBox">{children}</div>;
};

export default QuestionsBox;
