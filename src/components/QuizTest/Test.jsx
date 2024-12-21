import React from "react";
import { NavLink, Outlet,useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const Test = () => {
    const navigate = useNavigate()
  return (
    <div>
      <div className="test-links">
        <ul style={{display:'flex', flexDirection:'row', gap:'2rem', marginBottom:'2rem'}}>
          <li>
            <NavLink to="questions">Questions</NavLink>
          </li>
          <li>
            <NavLink to="answers">Answers</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />

      <div className="test-buttons" style={{marginTop:'2rem'}}>
        <Button onClick={()=>navigate('/')}>Go To Home</Button>
        <Button onClick={()=>navigate('/search')}>Go To Search</Button>
        <Button onClick={()=>navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default Test;
