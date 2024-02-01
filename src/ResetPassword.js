import React, {useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';
import {auth} from './firebase-config';
import { Container } from 'react-bootstrap';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');
    const sendResetEmail = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setAlertMessage('Login successful!');
            setAlertVariant('success');
            navigate('/login');
            setShowAlert(true);
        })
        .catch((error) => {
            setAlertMessage('Failed!');
            setAlertVariant('danger');
            navigate('/login');
            setShowAlert(true);
        });
    }
    
    return(
      <Container style={{width: '100vw', height: '100vh', position: 'absolte'}}>
        {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
        <Form.Group className="mb-3" controlId="">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <div className="d-grid gap-2">
              <Button variant="primary" type="submit" className='button' onClick={sendResetEmail}>
                Submit
              </Button>
              <Button variant="primary" type="submit" className='button' onClick={() => {navigate('/login')}}>
                Cancel
              </Button>
        </div>
      </Container>
    )
}

export default ResetPassword;