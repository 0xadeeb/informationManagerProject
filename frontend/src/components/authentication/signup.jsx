import React, { useState } from "react";
import { useHistory } from "react-router";
import UserData from "../../stores/userData";
import Password from "../text-area/password";
import SmallTextBox from "../text-area/smallTextBox";

function SignUp() {
  let histroy = useHistory();

  const [userName, setUserName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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
      alert("Enter a user name!");
      return;
    }

    if (firstname.length === 0) {
      alert("Enter your name!");
      return;
    }

    if (password1.length === 0) {
      alert("Enter a password!");
      return;
    }

    if (password2.length === 0) {
      alert("Confirm your password!");
      return;
    }

    if (password1.length < 6) {
      alert("Password too short\nShould be minimun 6 characters");
      return;
    }

    if (password1 !== password2) {
      alert("Password didn't match.");
      return;
    }

    const data = {
      userName: userName,
      firstName: firstname,
      password1: password1,
    };

    await fetch(`${process.env.REACT_APP_API_SERVER}/signup`, {
      headers: new Headers({ Accepts: "application/json" }),
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.error) alert(resp.error);
        else alert("New account created.");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="customBG">
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
