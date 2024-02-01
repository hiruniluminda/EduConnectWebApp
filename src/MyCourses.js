import React, {useState,useEffect} from "react";
import './MyCourses.css';
import  courseimg from './assets/courseimg.jpg';
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import EnrollCourse from "./EnrollCourse";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Notifications from "./Notifications";

import { useNavigate} from "react-router-dom";

/*developed by P.A.H.Niluminda*/

// const myCourses = [
//     {
//         id: 1,
//         name: 'Introduction to CS',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 90,
//     },
//     {
//         id: 2,
//         name: 'Introduction to Web',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 60,
//     },
//     {
//         id: 3,
//         name: 'Programming with JAVA',
//         level: 'Intermediate',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 80,
//     },
//     {
//         id: 4,
//         name: 'Introduction to JAVA',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 100,
//     },

//     {
//         id: 5,
//         name: 'Introduction to JAVA',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 100,
//     },

//     {
//         id: 6,
//         name: 'Introduction to JAVA',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 100,
//     },

//     {
//         id: 7,
//         name: 'Introduction to JAVA',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 100,
//     },

//     {
//         id: 8,
//         name: 'Introduction to JAVA',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 100,
//     },

//     {
//         id: 9,
//         name: 'Introduction to JAVA',
//         level: 'beginner',
//         duration: '4weeks',
//         image: courseimg,
//         progress: 100,
//     },
// ];
const radios = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
  ];

const MyCourses = ({setCourseID,username}) => {
    const [radioValue, setRadioValue] = useState('1');
    const navigate = useNavigate();
    const [myCourses,setCourses] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/educonnect/php/fetchEnrollCourses.php', {
            method: 'POST',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({radioValue}),
          });
          const responseData = await response.json();
          console.log(responseData);
          if (responseData.length > 0) {
            setCourses((myCourses) => [...myCourses, responseData]); // Set the user state when data is ready
          } else {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
    };
    useEffect(() => {
        fetchData();
        console.log(myCourses)
    },[]);
    return(
        <Container xs={12} fluid className="d-flex flex-coumn">
            <Col xs={10} className="drw" style={{overflow:"auto", maxHeight:"100vh"}}>
            <Row style={{color:"black",padding:"20px",fontSize:"20px"}}>RECENTLY ACCESSED</Row>
            <Row className="gap-2" style={{display:"flex", overflowY: "hidden", overflowX:"auto", maxHeight:"400px", flexDirection:"column"}}>
            {myCourses.map( course => course.map(e=>(
                <EnrollCourse
                name={e.coursename}
                duration={e.duration}
                image={e.image}
                progress={e.progress}
                onClick={() => {setCourseID(e.course_Id);navigate('courseModule')}}
                />
            )))}
        </Row>
        <Row style={{color:"black",padding:"20px",fontSize:"20px"}}>ENROLLED</Row>
        <Row className="gap-2" style={{overflow:"auto",flexDirection:"column",maxHeight:"800px"}}>
            {myCourses.map( course => course.map(e=>(
                <EnrollCourse
                name={e.coursename}
                duration={e.duration}
                image={e.image}
                progress={e.progress}
                onClick={() => {setCourseID(e.course_Id);navigate('courseModule')}}
                />
            )))}
        </Row>
        <Row style={{display:"flex",maxHeight:"50px",marginLeft:"40%"}} >
            <ButtonGroup style={{paddingTop: '1em', width: '100%', maxWidth: '150px', justifySelf: 'center'}}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </Row>

        </Col>
        
        <Col className="d-flex justify-content-center">
            <Notifications username={username}/>
        </Col>
                </Container>
    );
}

export default MyCourses;