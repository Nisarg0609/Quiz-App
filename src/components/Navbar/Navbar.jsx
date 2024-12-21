import './Navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <ul style={{display:'flex', flexDirection:'row', gap:'2rem', marginBottom:'2rem'}}>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="test">Test</NavLink>
            </li>
            <li>
                <NavLink to="search">Search</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Navbar