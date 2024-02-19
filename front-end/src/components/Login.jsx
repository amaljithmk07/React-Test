import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [logininput, setLogininput] = useState({});

  //Input

  const inputHandler = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setLogininput({ ...logininput, [name]: value });
  };
  const navigate = useNavigate();

  //Form Submit

  const loginHandler = (e) => {
    // console.log(e);
    e.preventDefault();

    axios
      .post("http://localhost:3333/login", logininput)
      .then((data) => {
        console.log(data);
        navigate("/test");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <center>
      <form action="">
        email: <input type="text" name="email" onChange={inputHandler} />
        <br />
        password:
        <input type="password" name="password" onChange={inputHandler} />
        <br />
        <button onClick={loginHandler}>Login</button>
      </form>
    </center>
  );
};

export default Login;
