import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  //   console.log(input);

  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3333/`, input)
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <center>
      <form action="">
        name: <input type="text" name="name" onChange={inputHandler} />
        <br />
        phone: <input type="number" name="phone" onChange={inputHandler} />
        <br />
        email: <input type="text" name="email" onChange={inputHandler} />
        <br />
        password:{" "}
        <input type="password" name="password" onChange={inputHandler} />
        <br />
        <button onClick={registerHandler}>Register </button>
      </form>
    </center>
  );
};

export default Register;
