import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Password from "../text-area/password";
import SmallTextBox from "../text-area/smallTextBox";
import { useToken } from "../../stores/context";
import { Alert } from "react-bootstrap";
import "../../App.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [pswrd, setPassword] = useState("");
  const [token, setToken] = useToken();
  const [alertMsg, setAlertMsg] = useState(null);

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  let handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userName, pswrd);
    let data = {
      userName: userName,
      pass: pswrd,
    };

    await fetch(`${process.env.REACT_APP_API_SERVER}/login`, {
      headers: new Headers({ Accepts: "application/json" }),
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.accessToken) {
          sessionStorage.setItem("token", resp.accessToken);
          setToken(resp.accessToken);
        }
        setAlertMsg([resp.msg, resp.variant]);
      })
      .catch((e) => console.log(e));
  };

  return token && token != undefined && token.length >= 10 ? (
    <Redirect to="/" />
  ) : (
    <div className="customBG">
      {alertMsg ? (
        <Alert
          variant={alertMsg[1]}
          key={1}
          onClose={() => setAlertMsg(null)}
          dismissible
        >
          <p> {alertMsg[0]}</p>
        </Alert>
      ) : null}
      <br />
      <br />
      <div className="center">
        <form onSubmit={handleSubmit}>
          <h3 align="center">Login</h3>
          <SmallTextBox
            placeHolder={"Enter username"}
            label={"User name"}
            value={userName}
            callBack={updateUserName}
          />
          <Password
            placeHolder={"Enter password"}
            label={"Password"}
            value={pswrd}
            callBack={updatePassword}
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
