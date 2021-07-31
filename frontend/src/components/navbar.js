import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useToken } from "../stores/context";

function Navbar(props) {
  const [token, setToken] = useToken();
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
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
            {!token ? (
              <Link className="nav-item nav-link mr-3" id="login" to="/log-in">
                Login
              </Link>
            ) : (
              <Link className="nav-item nav-link mr-3" id="home" to="/">
                Home
              </Link>
            )}

            {!token ? (
              <Link className="nav-item nav-link" id="signUp" to="/sign-up">
                Sign Up
              </Link>
            ) : (
              <button
                className="btn btn-secondary"
                id="logout"
                onClick={(e) => props.callback(e)}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
