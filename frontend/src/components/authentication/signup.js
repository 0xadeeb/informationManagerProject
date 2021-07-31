import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useToken } from "../../stores/context";
import { Alert } from "react-bootstrap";
import Password from "../text-area/password";
import SmallTextBox from "../text-area/smallTextBox";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);
  const [token, setToken] = useToken();

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function updateFirstName(event) {
    setFirstname(event.target.value);
  }

  function updatePass1(event) {
    setPassword1(event.target.value);
  }

  function updatePass2(event) {
    setPassword2(event.target.value);
  }

  let handleSubmit = async (event) => {
    event.preventDefault();

    console.log(firstname);
    console.log(userName);

    if (userName.length === 0) {
      setAlertMsg(["Enter a user name!", "danger"]);
      return;
    }

    if (firstname.length === 0) {
      setAlertMsg(["Enter your name!", "danger"]);
      return;
    }

    if (password1.length === 0) {
      setAlertMsg(["Enter a password!", "danger"]);
      return;
    }

    if (password2.length === 0) {
      setAlertMsg(["Confirm your password!", "danger"]);
      return;
    }

    if (password1.length < 6) {
      setAlertMsg([
        "Password too short- Should be minimun 6 characters",
        "danger",
      ]);
      setPassword1("");
      setPassword2("");
      return;
    }

    if (password1 !== password2) {
      setAlertMsg(["Password didn't match.", "danger"]);
      setPassword1("");
      setPassword2("");
      return;
    }

    const data = {
      userName: userName,
      firstName: firstname,
      password1: password1,
    };

    await fetch(`/signup`, {
      headers: new Headers({ Accepts: "application/json" }),
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setAlertMsg([resp["msg"], resp["variant"]]);
        setUserName("");
        setFirstname("");
        setPassword1("");
        setPassword2("");
        if (resp.accessToken) {
          sessionStorage.setItem("token", resp.accessToken);
          setToken(resp.accessToken);
        }
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
      <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12"></div>
        <div className="col-md-4 col-sm-4 col-xs-12">
          <form onSubmit={handleSubmit}>
            <h3 align="center">Sign Up</h3>
            <SmallTextBox
              placeHolder={"Enter username"}
              label={"User name"}
              callBack={updateUserName}
              value={userName}
            />
            <SmallTextBox
              placeHolder={"Enter your name"}
              label={"First name"}
              callBack={updateFirstName}
              value={firstname}
            />
            <Password
              placeHolder={"Enter password"}
              label={"Password"}
              callBack={updatePass1}
              value={password1}
            />
            <Password
              placeHolder={"Confirm password"}
              label={"Confirm password"}
              callBack={updatePass2}
              value={password2}
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
        <div className="col-md-4 col-sm-4 col-xs-12"></div>
      </div>
    </div>
  );
}

export default SignUp;
