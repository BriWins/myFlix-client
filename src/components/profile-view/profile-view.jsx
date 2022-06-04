import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile-view.scss";
//import {UpdateView} from "./update-view";
//import {FavoriteView} from "./favorite-view";
import { MovieCard } from "../movie-card/movie-card";

import { Button, Form, Card, Nav, Container, Modal, Row } from "react-bootstrap/";

export function ProfileView({ movies }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [show, setShow] = useState(false)

  useEffect(() => {
    getUser();
}, [])

    const getUser = () => {
      const users = localStorage.getItem('users');
      const token = localStorage.getItem('token');
        axios.get(`https://glacial-shore-06302.herokuapp.com/users/${users}`, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
        setUsername(response.data.Username)
        setEmail(response.data.Email)
        setFavoriteMovies(response.data.FavoriteMovies)
        console.log(response.data)
        })
        .catch(error => console.error(error))
      }

      const updateUser = () => {
        let token = localStorage.getItem('token');
        let users = localStorage.getItem("users");
        axios.put(`https://glacial-shore-06302.herokuapp.com/users/${users}`, {
          Username: username,
          Password: password,
          Email: email, 
          Birthdate: birthdate
        },
          {
            headers: {
              Authorization: "Bearer" + token
            }
          }).then((response) => {
            alert('Your profile has been updated');
            localStorage.setItem('users', response.data.Username),
              console.log(response.data)
          })
          .catch(e => {
            console.log('Error')
          });
      }
      
      const deleteUser = () => {
        setShowModal(false)
        let token = localStorage.getItem('token');
        let users = localStorage.getItem("users");
        axios.delete(`https://glacial-shore-06302.herokuapp.com/users/${users}`,
          {
            headers: {
              Authorization: "Bearer" + token
            }
          }).then((response) => {
            console.log(response.data);
            alert(`Account ${users.Username} was successfully deleted.`);
            localStorage.removeItem('users');
            localStorage.removeItem('token');
            window.open("/register", "_self");
          })
          .catch(e => {
            console.log('Error')
          });
      }
       
      const favoriteMoviesList = () => {
        console.log(movies)
        if (movies.length + 0) {
    
          return (
            <Row className="justify-content-md-center">
    
              {favoriteMoviesList.length === 0 ? (<h5>Add some movies to your list</h5>) : (
                favoriteMoviesList.map((movieId, i) => (
                  <Col md={6} lg={4}>
                    <MovieCard key={`${i}-${movieId}`} movies={movies.find(m => m._id == movieId)} />
                  </Col>
                ))
              )}
    
            </Row>
          )
        }
      }
   
// Functions needed to open and close the modal (below) to delete a user 
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

// Function that contains the modal to delete a users account 
const cancelUserModal = () => {

  return (
    <>
      <Modal style={{ background: "transparent" }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

return (
  <>
    <Container>
      <h1>Profile Page</h1>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter new email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control onChange={(e) => setBirthdate(e.target.value)} value={birthdate} type="date" placeholder="Date of birth" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" />
        </Form.Group>

        <Button variant="warning" onClick={updateUser}>
          Update your profile
        </Button>

        {/* This button triggers a modal that's called bellow   */}
        <Button className='deleteButton' variant="link" onClick={handleShow}>
          Delete your profile
        </Button>
      </Form>

      {/* Calling the function that renders the modal to delete the users account */}
      {cancelUserModal()}

      <p></p>
      <h2>Favorite Movies:</h2>

      {/* Calling the function that renders the users favourite movies on the profile page */}
      {favoriteMoviesList()}

    </Container>
  </>
)
}

