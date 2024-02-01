//import './App.css';
import React,{ useState } from 'react';
import { Button, Col, Container, Row , Image} from "react-bootstrap";
import avatar from './assets/avatar.jpg';
import MyCourses from './MyCourses';
import ProfilePage from './ProfilePage';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faClose, faGraduationCap, faInfo, faPlug, faSignOut, faUniversity, faUsers,  } from '@fortawesome/free-solid-svg-icons'

/*developed by P.A.H.Niluminda*/



const options = [
    {
        id: 0,
        icon: faUniversity,
        name: 'Courses',
    },
    {
        id: 1,
        icon: faGraduationCap,
        name: 'MyCourses',
    },
    {
        id: 2,
        icon: faUsers,
        name: 'Community',
    },
    {
        id: 3,
        icon: faPlug,
        name: 'Settings'
    },
    
];

const DBtn = ({ icon, name, isActive, onClick }) => (
    <Button className={`dbtn btn btn-primary ${isActive ? 'active' : ''}`} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />&nbsp;&nbsp;&nbsp;{name}
    </Button>
);


const Dashboard = () => {
    const [activeButtonId, setActiveButtonId] = useState(0);

    const handleButtonClick = (id) => {
        setActiveButtonId(id);
    }
    return(
        <Container fluid>
            <Row>
                <Col xs={1} className="drawer">
                    <Row className='d-flex flex-coumn profile'>
                        <Image src={avatar} alt='avatar' className="avatar" roundedCircle style={{width :'120px', height:'auto'}}/>
                        <Button variant = 'link' style={{color :'aliceblue'}}>Username</Button>
                    </Row>
                    <Row xs={1} style={{height:'50%'}} className='d-flex flex-coumn align-items-center'>
                        {options.map(option => (
                             <DBtn
                             key={option.id}
                             icon={option.icon}
                             name={option.name}
                             isActive={option.id === activeButtonId}
                             onClick={() => handleButtonClick(option.id)}
                            />
                        ))}
                    </Row>
                    <Row xs={1} style={{height:'15%'}}>
                        <DBtn
                        key={4}
                        icon= {faInfo}
                        name={'About us'}
                        isActive={4 === activeButtonId}
                        onClick={() => handleButtonClick(4)}
                        />
                        <hr/>
                        <Button variant='link' style={{color: 'white'}}><FontAwesomeIcon icon={faSignOut}/>&nbsp;&nbsp;&nbsp;Log Out </Button>
                        <Col style={{ textAlign: 'center', color: 'white', padding: '5px'}}> © Golden Pro, Inc. All rights reserved.</Col>
                    </Row>
                </Col>
                <Col fluid id="renderScreen" style={{display:"flex",flexWrap:"wrap"}}>
                    <ProfilePage/>
                </Col>
            </Row>
        </Container>
    );
}
export default Dashboard;