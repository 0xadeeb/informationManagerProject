import { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home/noteList";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserData from "./stores/userData";

function App() {
  const [resp, setResp] = useState(true);
  const [id, sId] = useState(2);

  function setId(i) {
    sId(i);
    // console.log(id);
  }

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

    console.log(resp);
  }, [id]);

  return (
    <Router>
      <div className="home">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/log-in" exact component={Login} />
          <Route path="/sign-up" exact component={Signup} />
        </Switch>
        <button onClick={() => setId(1)}>1</button>
        <button onClick={() => setId(2)}>2</button>
        <button onClick={() => setId(3)}>3</button>
      </div>
    </Router>
  );
}

export default App;
