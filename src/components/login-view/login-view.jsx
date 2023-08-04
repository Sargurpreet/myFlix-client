import React from "react";
import { useState } from "react";

export const LoginView = ({onLoogedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {
      Email: email,
      Password: password
    };

    fetch("https://sargur-movies-9fe33be3ebb3.herokuapp.com/login", {
      method: "Post",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoogedIn(data.user, data.token);
      }else {
        alert ("No such user.");
      }
    })
    .catch((e) => {
      alert("Something went wrong.");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </label>
      <label>
        Password:
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );

}