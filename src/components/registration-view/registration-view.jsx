import { useState } from "react";
import { Form, Button } from "react-bootstrap/";

export function LoginView(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    
    /* a hook is declared for each input*/

    const [ usernameErr, setUsernameErr ] = useState("");
    const [ passwordErr, setPasswordErr ] = useState("");

     /* validating user inputs*/

}