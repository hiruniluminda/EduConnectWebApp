import React, {useState} from "react";
import { Card, Button} from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
/*developed by P.A.H.Niluminda*/

const EnrollCourse = ({name,duration,image,progress,onClick}) => {
    return(
             <Card style={{display:'flex', flexDirection: 'column', overflow: 'hidden' ,width:'12rem', padding: '0px', boxShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
             <Card.Img variant="top" src={image} />
             <Card.Body>
             <Card.Title>{name}</Card.Title>
            <Card.Text>{duration}</Card.Text>
            <ProgressBar animated now={progress} style={{marginBottom:"10px"}}/>
            <Button variant="primary" onClick={onClick}>Continue</Button>
            </Card.Body>
            </Card>
    );
}

export default EnrollCourse;