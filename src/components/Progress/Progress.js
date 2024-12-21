import React from 'react'
import './progress.css'

const Progress = ({value, max}) => {
  return (
    <div className='progress-container'>
      <progress value={value} max={max}/>
    </div>
  )
}

export default Progress