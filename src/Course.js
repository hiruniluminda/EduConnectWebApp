import React,{ useState,useEffect } from "react";
import { Accordion,Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faVideo, faQuestion, faBeer } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from "react-router-dom";

/** 
  *@author github.com/daser46
  course module -> course compenent
*/

const Course = ({courseID,setModuleID}) => {
    const [modules, setModules] = useState([]);
    const fetchData = async () => {
        try {
            if (!courseID) {
                navigate('/dashboard');
                return;   
            }
            const response = await fetch('http://localhost/educonnect/php/fetchModules.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({courseID}),
          });
  
          const responseData = await response.json();
          //console.log(responseData);
          //setModules((modules) => [...modules, responseData]);
          setModules([responseData]);
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
    };

    useEffect(() => {
        fetchData();
        // Call the fetchData function
    }, []);
    const Module = ({type,ID}) => {
        switch(type){
            case 'text':
                return <Button variant='outline-success' fluid onClick={() => {setModuleID(ID); navigate('textmodule')}}><FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;&nbsp;Text Module</Button>
            case 'video':
                return <Button variant='outline-success' fluid onClick={() => {setModuleID(ID);navigate('videomodule')}}><FontAwesomeIcon icon={faVideo} />&nbsp;&nbsp;&nbsp;Video Module</Button>
            case 'quiz':
                return <Button variant='outline-secondary' fluid onClick={() => {setModuleID(ID);navigate('quizmodule')}}><FontAwesomeIcon icon={faQuestion} />&nbsp;&nbsp;&nbsp;Quiz Module</Button>
            case 'lab':
                <Button variant='outline-success' fluid onClick={() => {setModuleID(ID);navigate('textmodule')}}><FontAwesomeIcon icon={faBeer} />&nbsp;&nbsp;&nbsp;Lab Module</Button>
            default:
                return <></>
        }
    }

    //const Module = () => <Button variant='outline-success' fluid onClick={() => {navigate('textmodule')}}><FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;&nbsp;Text Module</Button>
    const navigate = useNavigate();
    return(
        <>
        <Accordion defaultActiveKey={["0","1"]} alwaysOpen>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Introduction</Accordion.Header>
            <Accordion.Body>
                {/*Actual course introduction should fetch from the course table and goes here, As we don't
                have a introduction in currnet model i will leave it like this for simplicity*/}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Course Modules</Accordion.Header>
            <Accordion.Body>
                {modules.map(c => c.map(e => <Module type={e.module_Type} ID= {e.module_Id}/>))}
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Instructions</Accordion.Header>
            <Accordion.Body>
                Click on Done button If you are complete with the module in order to save your progress.
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </>
    );
}

export default Course;