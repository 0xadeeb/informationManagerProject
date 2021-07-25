import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home/noteList";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useToken } from "./stores/context";

function App() {
  const [token, setToken] = useToken();

  useEffect(() => {
    let t = sessionStorage.getItem("token");
    if (t && t != undefined && t != "") setToken(t);
  }, []);

  function lgout(e) {
    e.preventDefault();
    sessionStorage.removeItem("token");
    setToken(null);
  }

  return (
    <Router>
      <div className="home">
        <Navbar callback={(e) => lgout(e)} />
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
