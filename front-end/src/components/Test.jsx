import React, { useEffect, useState } from "react";
import axios from "axios";
import './Test.css'
const Test = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user);

  return (
    <center className="body">
      {user.map((data) => (
        <div className="card-body" key={data._id}>
          <img src="/profile.png" alt="" className="profile"/>
          <h2>Id:{data.id}</h2>
          <h2>Name:{data.name}</h2>
          <h2>Email:{data.email}</h2>
          <h2>Website:{data.website}</h2>
        </div>
      ))}
    </center>
  );
};

export default Test;
