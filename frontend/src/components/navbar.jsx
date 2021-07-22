import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" id="home" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link" id="logout" to="/logout">
              Logout
            </Link>
            <Link className="nav-item nav-link" id="login" to="/log-in">
              Login
            </Link>
            <Link className="nav-item nav-link" id="signUp" to="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
