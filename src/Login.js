import React, {useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';
import {auth} from './firebase-config';

import './App.css';


const Login = ({setUserData}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
    const navigateToReset = () => {
      navigate('/resetpassword');
    }

    const handleUserName = (e) => {
      setUserName(e.target.value);
    }
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
    useEffect(() => {
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        setUserData(savedUserData);
      }
    }, [setUserData]);
    const checkAuth = () => {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, userName, password)
          .then((userCredential) => {
            resolve(userCredential ? true : false);
          })
          .catch((error) => {
            reject("Authentication failed");
          });
      });
    }
    const authenticate = async (e) => {
      e.preventDefault();
      try {
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
          setUserData(userName);
          localStorage.setItem("userData", userName);
          setAlertMessage('Login successful!');
          setAlertVariant('success');
          navigate('/dashboard');
        }else{
          setAlertMessage('Login failed!');
          setAlertVariant('danger');  
        };
      setShowAlert(true);
      }catch(error){
        setAlertMessage('Login failed!');
        setAlertVariant('danger'); 
        setShowAlert(true);
      }
    }
    return(
      <div> 
        <Form>
            <h2 className='title'>Login Here!</h2>
            {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={userName} placeholder="name@example.com" onChange={handleUserName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} placeholder="password" onChange={handlePassword}/>
            </Form.Group>
            <Form.Text id="passwordHelpBlock" muted>
            <div className="d-grid gap-2">
              <Button variant="link" type="button" size="sm" onClick={navigateToReset}>
                Forgot Password?
              </Button>
            </div>    
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="remember me" />
            </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" className='button' onClick={authenticate}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
}
export default Login;