import React, { useState } from 'react';
import PropTypes from "prop-types";

import RegisterView from "../registration-view/registration-view";
import "./login-view.scss";

import { Form, Button, Card } from "react-bootstrap/";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState("");
  const [ passwordErr, setPasswordErr ] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 6 ){
      setUsernameErr("Username must be 6 characters long");
      isReq = false;
    }
     return isReq;
  }

 
 const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send request to the server for authentication */
      axios.post("https://stark-oasis-54313.herokuapp.com/login", {
          Username: username,
          Password: password
      })
      .then(response =>{
          const data = response.data;
          props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }
  };
  

  return (
    <Card 
    id="login_card"
    bg='primary'
    text='white'
    style={{ width: "10rem"}}>
          <Card.Body>
            <Card.Title>Welcome, please login!</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" placeholder="Example: User123" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" 
                  aria-describedby="passwordHelpBlock" 
                  placeholder="Example: Password123"
                  onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button id="login_button" type="submit" onClick={handleSubmit}>Submit</Button>
              </Form>
                <Card.Text> Don't have an account?<Card.Link href='#'>Register Here!</Card.Link> </Card.Text>
            </Card.Body>
      </Card>
  );
}

LoginView.propTypes = {
    user: PropTypes.exact({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
};