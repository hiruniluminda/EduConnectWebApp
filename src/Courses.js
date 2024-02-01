import React, {useState,useEffect} from "react";
import './Courses.css';
import CourseView from "./CourseView";
import Notifications from "./Notifications";
import {Col, Container, Row } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { useNavigate} from "react-router-dom";

const radios = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
];

/*developed by P.A.H.Niluminda*/


const Courses = ({username,setCourseID}) => {
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);
    const [radioValue, setRadioValue] = useState('1');
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/educonnect/php/fetchCourse.php', {
            method: 'POST',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({radioValue}),
          });
          const responseData = await response.json();
         // console.log(responseData);
          if (responseData.length > 0) {
            setCourses((courses) => [...courses, responseData]); // Set the user state when data is ready
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
        //console.log(courses)
    },[]);

    if (courses.length <= 0) {
        // Return loading or placeholder content while waiting for the data
        return <Container className="text-center">Loading...</Container>;
    }

    const handleCourseClick = (course_Id) => {
        setCourseID(course_Id);
    };
    return(
        <Container xs={12} fluid className="d-flex flex-coumn h-100"  >
        <Col xs={9} className="d-flex flex-column">
            <Row>
                <Container><p style={{fontSize:"20px",textTransform:'uppercase', paddingTop: 0}}>Recomended courses</p></Container>
                <Row className="gap-2 scroll-bar-hidden" style={{overflowX:"auto", overflowY: 'hidden', flexDirection: 'column',whiteSpace: 'nowrap', maxHeight: '300px'}}>
                    {courses.length > 0 ? courses.map(course => ( course.map (c =>
                       <CourseView
                       key ={c.course_Id}
                       image={c.image}
                       name={c.coursename}
                       duration={c.duration}
                       level={c.level}
                       rating={c.ratings}
                       onClick={() => {handleCourseClick(c.course_Id);navigate('incourse');}}
                       />   
                    )
                    )) : 'No courses Avial!'}
                </Row>
            </Row>
            <Row className="d-flex flex-column flex-grow-1"> 
                <Container><p style={{fontSize:"20px",textTransform:'uppercase'}}>other courses</p></Container>
                <Row className="gap-2 scroll-bar-hidden" style={{overflowY:'scroll' ,whiteSpace: 'nowrap', maxHeight: 'calc(100vh - 450px)'}}>
                {courses.length > 0 ?courses.map(course => ( course.map (c =>
                       <CourseView
                       key ={c.course_Id}
                       image={c.image}
                       name={c.coursename}
                       duration={c.duration}
                       level={c.level}
                       rating={c.ratings}
                       onClick={() => {handleCourseClick(c.course_Id);navigate('incourse');}}
                       />   
                    )
                    )): 'No Courses Avail!'}
                </Row>
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
        <Col fluid className="d-flex justify-content-center p-2">
            <Notifications username={username}/>
        </Col>
        </Container>
    );
}

export default Courses;