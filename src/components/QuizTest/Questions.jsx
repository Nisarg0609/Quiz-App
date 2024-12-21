import React from 'react'
import questions from "../../assets/data/questions.json";
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const navigate = useNavigate();

  return (
    <div>
      {questions.reactQuestions.map((question, index) => (
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
            onClick={()=>{navigate(`/test/questions/${question.question}`)}}
          >
           {index}
          </button>
        ))}
    </div>
  )
}

export default Questions