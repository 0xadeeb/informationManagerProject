import React, { useState } from "react";
import { useHistory } from "react-router";
import Password from "../text-area/password";
import SmallTextBox from "../text-area/smallTextBox";
import CheckBox from "../buttons/checkBox";
import { useToken } from "../../stores/context";
import "../../App.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

function Login() {
  let histroy = useHistory();

  const [userName, setUserName] = useState("");
  const [pswrd, setPassword] = useState("");
  const [token, setToken] = useToken();

  if (token && token != undefined && token.length >= 10) {
    window.localStorage.href = "/";
  }

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
        // alert(resp.msg);
        if (resp.accessToken) {
          sessionStorage.setItem("token", resp.accessToken);
          setToken(resp.accessToken);
          histroy.push("/");
        }
      })
      .catch((e) => console.log(e));
  };

  return token && token != undefined && token.length >= 10 ? (
    <div>
      <h2>You are logged in</h2>
    </div>
  ) : (
    <div className="customBG">
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
          <CheckBox />
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
