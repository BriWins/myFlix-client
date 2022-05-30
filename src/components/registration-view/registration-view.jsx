import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap/";

import "./registration-view.scss"

export function RegistrationView(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthdate, setBirthdate ] = useState("");
    //const [ favorites, setFavorites ] = useState("");
    
    /* a hook is declared for each input*/

    const [ usernameErr, setUsernameErr ] = useState("");
    const [ passwordErr, setPasswordErr ] = useState("");
    const [ emailErr, setEmailErr ] = useState("");
    const [ birthdateErr, setBirthdateErr ] = useState("");
    

     /* validating user inputs*/

     const validate = () => {
         let isReq = true;
         if(!username){
             setUsernameErr("Username Required");
             isReq = false;
         } else if (username.length < 6){
             setUsernameErr("Username must be 6 characters long");
             isReq = false;
         }
         if(!password){
             setPasswordErr("Password Required");
             isReq = false;
         } else if (password.length < 8){
             setPasswordErr("Password must be 8 characters long");
             isReq = false;
         }
         if(!email){
             setEmailErr("Email Required");
             isReq = false;
         } else if (email.indexOf("@") === -1){
             setEmailErr("Please enter a valid email address");
             isReq = false;
         }
         return isReq;
     }


const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send request to the server for authentication */
      axios.post("https://stark-oasis-54313.herokuapp.com/users/register", {
          Username: username,
          Password: password,
          Email: email,
          Birthdate: birthdate
      })
      .then(response =>{
          const data = response.data;
         console.log(data);
         alert("Registration successful, please login!");
         window.open("/","_self");
      })
      .catch(response => {
          console.error(response);
          alert("unable to register")
      })
    }
  };
  
    return (
        <Row>
            <Col>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          {/* code added here to display validation error */}
          {usernameErr && <p>{usernameErr}</p>}
  </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>}
  </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
          {/* code added here to display validation error */}
          {emailErr && <p>{emailErr}</p>}
  </Form.Group>
        <Form.Group controlId="formBirthdate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="birthdate" placeholder="Date of Birth is optional" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
          {/* code added here to display validation error */}
          {birthdateErr && <p>{birthdateErr}</p>}
  </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
          </Button>
          <p></p>
          <p>Already Registered? <Link to={"/"}> Sign In</Link> here!</p>
      </Form>
      </Col>
      </Row>
    )
  }

  RegistrationView.PropTypes = {
      register: PropTypes.shape({
          Username: PropTypes.string.isRequired,
          Password: PropTypes.string.isRequired,
          Email: PropTypes.string.isRequired,
          Birthdate: PropTypes.string
      })
  };