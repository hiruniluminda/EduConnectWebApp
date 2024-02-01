//import './About.css';
import React,{ useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from './assets/logo.png';
import team from './assets/team.jpg';

import Accordion from 'react-bootstrap/Accordion';

/*developed by P.A.H.Niluminda*/


const App = () => {
  return (
    <Container fluid>
    <Row className='blue'>
      <Col fluid>
        <img src={logo} alt="logo" style={{ width: '200px', height: 'auto', margin: '2em' }} />
      </Col>
    </Row>
    <Row className='lightblue'>
      <Col fluid></Col>
    </Row>
    <Row className=' footer'>
      <Col fluid style={{ textAlign: 'center', color: 'white', padding: '5px'}}>
        © Golden Pro, Inc. All rights reserved.
      </Col>
    </Row>

    <Container className='formWrapper'>
    <div>
      <h1 id='abouthead'>Welcome to a boundaryless world of knowledge!</h1>
      <p id='aboutheadpara'>Welcome to EduConnect, the revolutionary online platform that offers limitless learning opportunities. With a vast array of carefully curated courses, EduConnect empowers learners worldwide to enroll in courses that match their passions and aspirations. Whether you're a working professional, a student, or a curious learner, our platform covers diverse subjects and disciplines, accessible from your mobile browser and completely free of charge. EduConnect's user-friendly interface ensures effortless course discovery and enrollment, eliminating barriers to your educational journey.<br></br><br></br>
        Join us on this transformative educational voyage as we revolutionize learning. EduConnect unlocks a world of opportunities, whether you're advancing your career or exploring passions. Experience the joy of learning, the power of community, and the freedom to shape your own future with EduConnect. 
      </p>
    </div>  
    </Container>

    <Container className='formWrapper2'>
    <div>
      <h1 id='abouthead'>Developer Team</h1>
      <img src={team} alt="developmentTeam" style={{ width: '380px', height: 'auto', paddingLeft:'90px' }} />
    </div>
    </Container>
    <Container className='formWrapper3'>
    <Accordion defaultActiveKey={'0'} alwaysOpen>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Importance</Accordion.Header>
        <Accordion.Body>
        makes it easier for them to go through the topics and get understanding about each topic within stress and strain and just sitting idle in class and writing notes 
      </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Vision</Accordion.Header>
        <Accordion.Body>
        Setting the global standard in online, blended, and digital learning
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Mission</Accordion.Header>
        <Accordion.Body>
        Creating community and knowledge around quality online, blended, and digital learning while driving innovation.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Container>
    </Container>
  );
}
export default App;
