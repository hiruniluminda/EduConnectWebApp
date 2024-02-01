import React,{ useState,useEffect } from "react";
import './CourseModule.css';
import { Container, Row,Image, Col, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import courseLogo from "./assets/courselogo.png";
import myVideo from "./assets/myVideo.mp4";
import { useNavigate } from "react-router-dom";
/** 
  *@author github.com/daser46
  video module
*/
const VideoModule = ({id,userName,courseID}) => {
    const [moduleData, setModuleData] = useState({});
    const navigate = useNavigate();
    //const [radioValue, setRadioValue] = useState('1');
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/educonnect/php/fetchModuleData.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName,id,courseID}),
          });
  
          const responseData = await response.json();
          setModuleData(responseData); 
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }        
    }
    useEffect(() => {
        fetchData();
        console.log(moduleData);
        // Call the fetchData function
    },[id, userName, courseID]);

    const handleOnClick = async() => {
        const marks = moduleData[0].weighted;
        if(marks>0){
            try {
                const username = moduleData[0].username;
                const response = await fetch('http://localhost/educonnect/php/updateMarks.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({username,id,marks}),
              });
      
              const responseData = await response.text();
              console.log(responseData);
            } catch (error) {
              console.error('Error fetching user data:', error);
              navigate('/login');
            } 
        }
        navigate(-1);
        
    }
    return(
        <Container fluid className="container-fitScreen">
            <Row>
                <Col style={{boxShadow: '1px 1px 2px rgba(00,0,0,0.4)', marginBottom: '5px'}}>
                    <Image src={courseLogo} alt='logo' roundedCircle style={{width :'50px', height:'auto', margin: '1em'}}/>
                    {moduleData.length > 0 && moduleData[0].coursename}
                </Col>
            </Row>
            <Row>
                <Col className="p-2" fluid style={{boxShadow: '1px 1px 4px rgba(0,0,0,0.4)', marginBottom: '5px', fontSize: 'large'}}>
                    {moduleData.length > 0 && moduleData[0].topic}
                </Col>
            </Row>
            <Row className="m-2">
                <Col className='d-flex' style={{border: 'solid 1px grey' , flexGrow: '1', overflow: 'auto', textAlign: 'justify', alignItems:'center', justifyContent: 'center', maxHeight: '75vh', height: '75vh'}}>
                <iframe
                    title="YouTube Video"
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${moduleData.length > 0 && moduleData[0].content}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                
                </Col>
            </Row>
            <Row className="p-2 d-flex" style={{borderTop: 'solid grey 1px', justifyContent: 'flex-end'}}>
                <Col>
                    <Button variant="primary" style={{float: 'right'}} onClick={handleOnClick}>
                        Done
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default VideoModule;