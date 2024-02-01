import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faStar,faStarOfDavid } from '@fortawesome/free-solid-svg-icons';

/*developed by P.A.H.Niluminda*/


const ratingArray = (rating) => {
    const roundedRating = Math.round(rating);
    const componentsArray = Array.from({ length: roundedRating }, (_, index) => index);
    return componentsArray;
  };

const emptyArray = (rating) => {
    const roundedRating = 5 - Math.round(rating);
    const componentsArray = Array.from({ length: roundedRating }, (_, index) => index);
    return componentsArray;
  };

const CourseView = ({image,name,duration,level,rating,onClick}) => {
    return(
        <Card style={{display:'flex', flexDirection: 'column', overflow: 'hidden' ,width:'12rem', padding: '0px', boxShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
            <Card.Img src={image} variant='top'/>
            <Card.Title>{name}</Card.Title>
            <Row>
                <Col xs={5}>
                    <Card.Text style={{fontSize: '12px', paddingLeft: '5px'}}> <FontAwesomeIcon icon={faClock}/> : {duration}</Card.Text>
                </Col>
                <Col xs={7}>
                    <Card.Text style={{fontSize: '12px'}}> Level : {level} </Card.Text>
                </Col>
            </Row> 
            <Row className='text-center'>
                <Card.Text >Rating :  <span style={{color:'orange'}}>{ratingArray(rating).map(e=><FontAwesomeIcon icon={faStar}/>)}</span>{emptyArray(rating).map(e=><FontAwesomeIcon icon={faStarOfDavid}/>)} {rating}</Card.Text> 
                <Button style={{margin:0}} onClick={onClick}>View</Button> 
            </Row>
        </Card>
    );
}

export default CourseView;