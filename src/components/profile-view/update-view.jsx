import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Container, Card, CardGroup, Modal } from "react-bootstrap/";

export function ProfileView(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthdate, setBirthdate ] = useState("");
    
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
        if (isReq) {
          const token = localStorage.getItem('token');
          axios.put(`https://glacial-shore-06302.herokuapp.com/users/${user.Username}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthdate
          },
          {
            headers: { Authorization: `Bearer ${token}`}
          })
          .then(response => {
            console.log(response.data);
            alert('Your profile was successfully updated.');
            window.open('/users/:Username', '_self');
          })
          .catch(error => {
            console.error(error);
            alert('Unable to update your profile.');
          });
        }
      };
  
      return (
        <Container id="update-form" className="mt-5">
          <Row><h4>Edit your profile</h4></Row>
          <Row>
            <Col sm="10" md="8" lg="6">
              <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
                    {/* display validation error */}
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                      {/* display validation error */}
                      {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                      <Form.Label>Email Address:</Form.Label>
                      <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                      {/* display validation error */}
                      {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formBirthdate">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)} placeholder="XX/XX/XXXX" />
                  </Form.Group>
                  
                  <Form.Group controlId="formBirthdate" className="mt-3">
                    <Button  variant="warning" type="submit" onClick={handleSubmit}>Edit profile</Button>
                  </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }