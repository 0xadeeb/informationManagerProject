import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home/noteList";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="home">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/log-in" exact component={Login} />
          <Route path="/sign-up" exact component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
