import React from "react";
import './summary.css'

const Summary = ({ children, summary, title, points, totalPoints }) => {
  return (
    <div className="summary">
      {summary === undefined || summary === null || summary === "" ? (
        <p className="summaryText">You Have Successfully Completed {title}</p>
      ) : (
        <p className="summaryText">{summary}</p>
      )}
      <p className="scoreText">You Have Scored &nbsp;{points} / {totalPoints}&nbsp; With {(points*100)/totalPoints}%</p>
      <div className="summaryBtn">{children}</div>
    </div>
  );
};

export default Summary;
