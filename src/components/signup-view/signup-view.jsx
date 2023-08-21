import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export const SignupView = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {  
      Name: name,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://sargur-movies-9fe33be3ebb3.herokuapp.com/user", {
      method: "Post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.error("Signup failed: ", data);
          alert("Signup failed once again");
        }
      })
      .catch((error) => {
        console.error("An error occured: ", error);
      });
  }

  return (

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name: </Form.Label>
        <Form.Control
        type="text"
        value={name}
        onChange={(e) =>
        setName(e.target.value)}
        required />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
        type="password"
        value={password}
        onChange={(e) =>
        setPassword(e.target.value)}
        required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control
        type="text"
        value={email}
        onChange={(e) =>
        setEmail(e.target.value)}
        required />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday: </Form.Label>
        <Form.Control
        type="text"
        value={birthday}
        onChange={(e) =>
        setBirthday(e.target.value)}
        required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    

  );

}