import React, { useState } from 'react';
import {Form, Button, Card, Container, Row, Col} from "react-bootstrap/";

import axios from "axios";

export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`https://glacial-shore-06302.herokuapp.com/login?Username=${username}&Password=${password}`)
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("no such user")
      });    
    };

return (
    <Container>
        <Row>
          <Col></Col> 
            <Col>  
               <Card> 
                  <Card.Body>
                    <Card.Title>Please Login</Card.Title>  
                      <Form>
                      <Form.Group className="mb-3">
                          <Form.Label>Username:</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                      </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Password:</Form.Label>
                          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="Remember me" />
                      </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Login
                        </Button>
                      </Form>
                  </Card.Body>
                </Card>  
             </Col> 
          <Col></Col>
        </Row>
      </Container>

  );
}