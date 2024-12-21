import React from 'react'
import { useParams } from 'react-router-dom';

const QuestionDetails = () => {
    const parameter = useParams()
    console.log(parameter,'parameter');
  return (
    <div>
        <p>question details</p>
        <p>{parameter?.question}</p>
    </div>
  )
}

export default QuestionDetails