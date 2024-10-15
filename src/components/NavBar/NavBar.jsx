import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {user ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
