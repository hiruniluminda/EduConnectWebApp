import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {auth,database} from './firebase-config';
import { useState } from 'react';
import { ref, child, get, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';
/** 
  *@author github.com/daser46
  register component
*/

const Register = () => {
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [dob, setDOB] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const dbRef = ref(database);

  const addUserToDatabase = async (username, email, password, dob) => {
    const userRef = child(dbRef, `users/${username}`);
    await set(userRef, {
      username,
      email,
      dob,
      password
    });
  };

  const isUsernameTaken = async (username) => {
    const userRef = child(dbRef, `users/${username}`);
    const snapshot = await get(userRef);
    return snapshot.exists();
  };

  const handleRegister = async (e, username, email, password, dob) => {
    if(password.length < 6){
      setAlertMessage(`password too short`);
      setAlertVariant('danger');
    }
    e.preventDefault();
    try {
      const usernameExists = await isUsernameTaken(username);
      if (usernameExists) {
        setAlertMessage('Username is already taken.');
        setAlertVariant('danger');
      } else {
        const response = await fetch('http://localhost/educonnect/php/insertUser.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, dob, password }),
        });

        const responseData = await response.text(); 
       // console.log('PHP Response:', responseData);

        await createUserWithEmailAndPassword(auth,email,password);
        await addUserToDatabase(username, email, password, dob);

        setAlertMessage('Registration successful!');
        setAlertVariant('success');
      }
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(`Registration error: ${error.message}`);
      setAlertVariant('danger');
      setShowAlert(true);
    }
  
  }
  return (
      <Form>
        <h2 className='title'>Register Here!</h2>
        {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} type="text" placeholder="user" onChange={(e)=> setUserName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} type="email" placeholder="name@example.com" onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control type="date" value={dob} onChange={(e)=>setDOB(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="password" onChange={(e) => (setPassword(e.target.value))}/>
        </Form.Group>
        <Form.Text id="passwordHelpBlock" muted>
          <div className="d-grid gap-2">
            <Button variant="link" type="submit" size="sm">
              Privacy and Policies
            </Button>
          </div>    
        </Form.Text>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Accept terms and conditions" />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="button" className='button' onClick={(e) => {handleRegister(e,username,email,password,dob)}}>
            Register
          </Button>
        </div> 
      </Form> 
  );
}

export default Register;
