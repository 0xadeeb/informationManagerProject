import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home/noteList";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TokenProvider } from "./stores/context";

function App() {
  const [resp, setResp] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/is-autherised`, {
      headers: new Headers({ Accepts: "application/json" }),
      method: "POST",
      body: JSON.stringify({ id: 1 }),
    })
      .then((res) => res.json())
      .then((auth) => setResp(auth.autherised))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TokenProvider>
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
    </TokenProvider>
  );
}

export default App;
