import React,{ useState, useEffect } from "react";
import './CourseModule.css';
import { Container, Row,Image, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import courseLogo from "./assets/courselogo.png";


import Course from "./Course";
import Progress from "./Progress";

import { Outlet,useNavigate } from "react-router-dom";

/** 
  *@author github.com/daser46
  course module view
  basically this view contains all the modules of the course and user progress to switch between
*/

const radios = [
    { name: 'Course', value: '1' },
    { name: 'Progress', value: '2' },
  ];


const CourseModule = ({userName,courseID,setModuleID}) => {
    const [progress, setProgress] = useState([]);
    const [current, setCurrent] = useState({});
    const navigate = useNavigate();
    const fetchData = async() => {
        try{
            const response = await fetch('http://localhost/educonnect/php/fetchProgress.php',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userName,courseID}),
                
            });
            const progressData = await response.json();
            setProgress(progressData); 
            //console.log(progressData); 
        }catch(error){
            console.log(error);
            navigate('/dashboard');
        }
    }

    const updatProgress = async() => {
        try{
            const response = await fetch('http://localhost/educonnect/php/updateProgress.php',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userName,courseID}),
                
            });
            const progressData = await response.json();
            setCurrent(progressData); 
            //console.log(progressData); 
        }catch(error){
            console.log(error);
            navigate('/dashboard');
        }
    }

    const [radioValue, setRadioValue] = useState('1');
    useEffect(()=> {
        if(!courseID || !userName){
            navigate('/dashboard');
        }else{
            fetchData();
            updatProgress();
        }
    }, [userName,courseID,navigate])
    
    return(
        <Container fluid className="container-fitScreen">
            <Row>
                <Col style={{boxShadow: '1px 1px 2px rgba(00,0,0,0.4)', marginBottom: '5px'}}>
                    <Image src={courseLogo} alt='logo' roundedCircle style={{width :'50px', height:'auto', margin: '1em'}}/>
                    {courseID}
                </Col>
            </Row>
            <Row>
                <Col fluid>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={radioValue === radio.value ? 'primary' : 'outline-success'}
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                        {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                </Col>
            </Row>
            <Row className="m-2">
                {radioValue === '2' ? <Progress pro={progress.length > 0 && progress} current={current.length > 0 && current[0]}/> : <Course courseID={courseID} userID={userName} setModuleID={setModuleID}/>}
            </Row>
            <Outlet/>
        </Container>
    );
}

export default CourseModule;


