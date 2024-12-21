import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import questions from "../../assets/data/questions.json";

const Search = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="search-box">
        {questions.reactQuestions.map((_, index) => (
          <button
            key={index}
            style={{
              margin: "0 0.5rem",
              backgroundColor: "red",
              padding: "0.5rem",
              cursor: "pointer",
              border:'none',
              color: 'white'
            }}
            onClick={()=>{navigate(`/search/${index}?sort=asce&filter=price`)}}
          >
           {index}
          </button>
        ))}
        <Button>search question</Button>
      </div>
      <div className="result">result</div>
      <div className="test-buttons" style={{ marginTop: "2rem" }}>
        <Button onClick={() => navigate("/")}>Go To Home</Button>
        <Button onClick={() => navigate("/test")}>Go To Test</Button>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default Search;
