import React from 'react'
import './button.css'

const Button = ({children, visibility, onClick}) => {
    let visible = visibility !== undefined ? visibility === true ? 'visible' : 'hidden' : 'visible';
  return (
    <button className='btn' style={{visibility:`${visible}`}} onClick={onClick}>{children}</button>
  )
}

export default Button