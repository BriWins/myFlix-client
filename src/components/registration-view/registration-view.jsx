import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Col, Row, Card, CardGroup, Container } from "react-bootstrap/";

import "./registration-view.scss"

export function RegistrationView(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthdate, setBirthdate ] = useState("");
    const [ favorites, setFavorites ] = useState("");

const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate, favorites);
     props.onRegistration(username);
  };

  return (

<Container>
      <Row>
        <Col>
        <CardGroup>
          <Card>
            <CardGroup>Welcome! Please Register</CardGroup>
        <Form>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Input a username"
                    required />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Passwords must be a minimum of 8 characters"
                    required
                    minLength={8} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Input your email"
                    required />
                </Form.Group>
              
                <Form.Group>
                  <Form.Label>Birthdate:</Form.Label>
                  <Form.Control 
                    type="birthdate" 
                    value={birthdate} 
                    onChange={e => setBirthdate(e.target.value)}
                    placeholder="Birthdate Format: XX/XX/XXXX" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Favorites:</Form.Label>
                  <Form.Control 
                    type="favorites" 
                    value={favorites} 
                    onChange={e => setFavorites(e.target.value)}
                    placeholder="Add favorite movies here!" />
                </Form.Group>
                <Button variant="danger" type="submit" onClick={handleRegistration}>Submit</Button>
          </Form>
          </Card>
        </CardGroup>
            
        </Col>
      </Row>
    </Container>
    
  );
}

RegistrationView.proptypes = {
    onRegistration: PropTypes.func.isRequired,
};