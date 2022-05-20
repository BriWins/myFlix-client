import React, { useState } from 'react';
import PropTypes from "prop-types";

import RegisterView from "../registration-view/registration-view";
import "./login-view.scss";

import { Form, Button, Card } from "react-bootstrap/";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username);
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