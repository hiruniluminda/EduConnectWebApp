import React, {useState} from "react";
import './MyCourses.css';
import  courseimg from './assets/courseimg.jpg';
import { Container, Card, Button, Col, Row } from "react-bootstrap";

/*developed by P.A.H.Niluminda*/

const courses = [
    {
        id: 1,
        name: 'Introduction to CS',
        level: 'beginner',
        duration: '4weeks',
        image: courseimg,
        ratings: 5,
        type: "software engineering",
        marks:"81"
    },
    {
        id: 2,
        name: 'Introduction to Web Devolopment',
        level: 'beginner',
        duration: '4weeks',
        image: courseimg,
        ratings: 5,
        type: "software engineering",
        marks:"81"

    },
    {
        id: 3,
        name: 'Programming with JAVA',
        level: 'Intermediate',
        duration: '4weeks',
        image: courseimg,
        ratings: 5,
        type: "software engineering",
        marks:"81"

    },
    {
        id: 4,
        name: 'Introduction to JAVA',
        level: 'beginner',
        duration: '4weeks',
        image: courseimg,
        ratings: 5,
        type: "software engineering",
        marks:"81"

    },
];
const variant = 'success';
function BgColorExample() {
  return (
    <>
      {courses.map((course) => (
        <Card
        bg="success"
        text="light"
          key={course.id}
          style={{ width: '12rem', whiteSpace:'none',maxHeight:"12rem",height:"12rem",margin:"5px"}}
          className="mb-2"
          variant = 'success'
        >
          <Card.Header>{course.type}</Card.Header>
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Text>
              Marks: {course.marks} 
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default BgColorExample;