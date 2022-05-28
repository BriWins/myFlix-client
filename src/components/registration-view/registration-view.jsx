import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap/";

export function LoginView(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    
    /* a hook is declared for each input*/

    const [ usernameErr, setUsernameErr ] = useState("");
    const [ passwordErr, setPasswordErr ] = useState("");

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
         return isReq;
     }


const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send request to the server for authentication */
      axios.post('YOUR_API_URL/login', {
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
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          {/* code added here to display validation error */}
          {usernameErr && <p>{usernameErr}</p>}
  </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {/* code added here to display validation error */}
          {passwordErr && <p>{passwordErr}</p>}
  </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
          </Button>
      </Form>
    )
  }