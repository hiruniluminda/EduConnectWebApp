import './InCourse.css';
import React, {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from './assets/logo.png';
import courselogo from './assets/courselogo.png';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const InCourse = ({userName,courseID}) => {
  const [course,setCourse] = useState(null);
  const [enrollment,setEnrollment] = useState(null);
  const [quizzesNO,setQuizzesNO] = useState(null);
  const [enrolls, setEnrolls] = useState(null);
  const navigate = useNavigate();
  //console.log(userName);
 
  /*developed by P.A.H.Niluminda*/


  const checkEnrollment = async (courseID,userName) => {
    //handle check enrollment here.
    try {
      const response = await fetch('http://localhost/educonnect/php/checkEnrollment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({courseID,userName}),
    });

    const responseData = await response.text();
    //console.log(responseData);
    if(responseData === 'true'){
      setEnrollment(true);
    }else if(responseData === 'false'){
      return false;
    }else{
      navigate('/login');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    navigate('/login');
  }
  }
  /*developed by P.A.H.Niluminda*/

  const fetchData = async () => {
    try {
        const response = await fetch('http://localhost/educonnect/php/fetchInCourse.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({courseID}),
      });

      const responseData = await response.json();

      const courseDetails = responseData[0];
      setCourse(courseDetails); // Set the course state when data is ready
      const quizCount = responseData[1];
      setQuizzesNO(quizCount);
      const enrollsCount = responseData[2];
      setEnrolls(enrollsCount);
      //console.log(responseData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    }
  };
  useEffect(() => {
    // Call the fetchData function
    fetchData();
    checkEnrollment(courseID,userName);
  }, [userName,navigate]);

  //loader
  /*developed by P.A.H.Niluminda*/

  if (!course) {
    // Return loading or placeholder content while waiting for the data
    // should develop this more attractively if we have some time left. lets leave it like this for now
    return <Container className="text-center">Loading...</Container>;
  }

  const enrollThisCourse = async () => {
    if(!enrollment){
      try {
        const response = await fetch('http://localhost/educonnect/php/enrollUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({courseID,userName}),
      });

      const responseData = await response.text();
      console.log(responseData);
      if(responseData==="user inserted!"){
          navigate('/dashboard');
      }
      //console.log(responseData);
      }catch(error){
        console.error('Error fetching user data:', error);
        navigate('/login');
      } 
    }else{
      return;
    }
  }

  return (
    <Container fluid>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <Row className='blue'>
      <Col fluid>
        <img src={logo} alt="logo" style={{ width: '200px', height: 'auto', margin: '2em' }} />
      </Col>
    </Row>
    <Row className='lightblue'>
      <Col fluid></Col>
    </Row>
    <Row className='footer'>
      <Col fluid style={{ textAlign: 'center', color: 'white', padding: '5px'}}>
        © Golden Pro, Inc. All rights reserved.
      </Col>
    </Row>

    <Container className='formWrapper'>
    <div>
    <img src={courselogo} alt="logo" style={{ width: '50px', height: 'auto', margin: '1px' }} />
      <h1>{course.coursename} : &nbsp;{courseID}</h1>
      <p><Stack direction="horizontal" gap={3}>
      <div className="p-2">Taught in English</div>
      <div className="p-2 bdr">Software Engineering</div>
      <div className="p-2 bdr">Some content may not be translated</div>
    </Stack>
      </p>
    </div>
    <div className='row p-2'>
      {course.description}
    </div>  
    <div className="mb-2">
        <Button variant="primary" size="lg" onClick={enrollThisCourse}>
          <p className='enrlbtn'>{enrollment ? 'Alredy enrolled' : 'Enroll For Free'}</p>
        </Button>
      </div>
      <p className='enrlamnt'>{enrolls.enrollments} already enrolled</p>
      
      <div id='wrap'>
      <p><Stack direction="horizontal" gap={4}>
      <div className="p-2"><i class="fa fa-star-o" aria-hidden="true"></i> {course.avg_review}<br></br>({course.review_count})</div>
      <div className="p-2 bdr"><strong>{course.level} level</strong><br></br> No previous experience necessary</div>
      <div className="p-2 bdr"><strong>Approx. {course.duration} hours to complete</strong><br></br>3 weeks at 29 hours a week</div>
      <div className="p-2 bdr"><strong>Flexible schedule</strong><br></br> Learn at your own pace</div>

    </Stack>
      </p>
    </div>
    </Container>

    <Container className='slide'>
    <div>
      <h2>About</h2>
      <hr style={{ color:'black' }}></hr>
      <h5 style={{ padding:'20px' }}>Skills you'll gain :</h5>
      <Stack style={{ padding:'1px 10px 5px 30px' }} direction="horizontal" gap={3}>
      <Badge bg="primary">Programming Principles</Badge>
      <Badge bg="secondary">{course.category} Programming</Badge>
      <Badge bg="success">Computer Science</Badge>
      <Badge bg="danger">Algorithms</Badge>
    </Stack>
    <h5 style={{ padding:'20px' }}>Details to know :</h5>
    <div style={{ display:"flex" }}>
    <p style={{ paddingLeft:'50px' }}><i class="fa fa-book" aria-hidden="true"></i><br></br><strong>Assessments</strong><br></br>{quizzesNO.quizzesCount} quizzes</p>
    <p style={{ paddingLeft:'100px' }}><i class="fa fa-cc" aria-hidden="true"></i><br></br><strong>English</strong><br></br>Subtitles: Kazakh, German</p>
    </div>
    </div>
  
  </Container>
  </Container>
  );
}
export default InCourse;
