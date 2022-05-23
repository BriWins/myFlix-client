import React, { useState } from 'react';


import axios from "axios";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://afternoon-ravine-04592.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log("no such user")
    });    
  };



  return (
<Form>
  <Form.Group className="mb-3">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter username" />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter password" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Check type="checkbox" label="Remember me" />
  </Form.Group>
  <Button variant="primary" type="submit">
  Login
  </Button>
</Form>
    
  );

  // return (
  //   <form>
  //     <label>
  //       Username:
  //       <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
  //     </label>
  //     <label>
  //       Password:
  //       <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
  //     </label>
  //     <button type="submit" onClick={handleSubmit}>Submit</button>
  //   </form>
  // );
}