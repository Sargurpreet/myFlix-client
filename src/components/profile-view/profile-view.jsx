import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "../profile-view/profile-view.scss"

export const ProfileView = ({ user, token, setUser }) => {
  const [name, setName] = useState(user.Name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.BirthDate);
  const [showModal, setShowModal] = useState(false);
  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie)
  });
  

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Password: password,
      Email: email,
      BirthDate: birthday,
    };

    

    fetch(`https://sargur-movies-9fe33be3ebb3.herokuapp.com/user/${user.Email}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed.");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  const handleDeleteUser = () => {
    fetch(`https://sargur-movies-9fe33be3ebb3.herokuapp.com/user/${user.Email}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          onLogout();
        } else {
          alert("Something went wrong.");
        }
      });
  };



  return (
    <div className="profile-view">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-form">
      <Row>
        <Col>
          <div>Name: {user.Name}</div>
          <div>Email: {user.Email}</div>
        </Col>
      </Row>
      <Row>
        <h4>Update your profile information here.</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-4">
            <Button variant="primary" type="submit">
              Save changes
            </Button>                     
            <Button variant="primary" onClick={handleShowModal}>
              Delete my account
            </Button>
          </div>
        </Form>
      </Row>
      <Row>
        <h3>Favorite movies:</h3>
        {favoriteMovies.map((movie) => (
        <Col className="mb-5" key={movie._id} md={4}>
          <MovieCard  movie={movie}></MovieCard>
        </Col>
        ))}
      </Row>

      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account permanently?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
