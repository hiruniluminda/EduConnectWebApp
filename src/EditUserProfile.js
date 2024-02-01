import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ref, child, get, set } from 'firebase/database';
import Alert from 'react-bootstrap/Alert';
import {auth,database} from './firebase-config';
import avatar from './assets/avatar.jpg';
import { Row, Image } from "react-bootstrap";

/*developed by P.A.H.Niluminda*/


const EditUserProfile = () => {
    const [username, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [dob, setDOB] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');

    const editDetails = () => {}
    const updateAvatar = () => {}
    return(
    <>
    <Form>
        <Row className='d-flex flex-coumn profile'>
            <Image src={avatar} alt='avatar' className="avatar" roundedCircle style={{width :'120px', height:'auto'}}/>
            <Button variant = 'link' onClick={() => updateAvatar()} style={{color :'aliceblue'}}>Avatar</Button>
        </Row>
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
        <div className="d-grid gap-2">
          <Button variant="primary" type="button" onClick={(e) => {editDetails(e,username,email,password,dob)}}>
            EDIT
          </Button>
          <Button variant="danger" type="button" onClick={(e) => {editDetails(e,username,email,password,dob)}}>
            Cancel
          </Button>
        </div> 
      </Form> 
    </>
    );
}

export default EditUserProfile;