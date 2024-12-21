import React from "react";
import "./title.css";

const Title = ({ title }) => {
  return (
    <>
      {title === "" || title === undefined || title === null ? (
        <h1>QUIZ TIME</h1>
      ) : (
        <h1>{title}</h1>
      )}
    </>
  );
};

export default Title;
