import './App.css';
import React,{ useState, useEffect } from 'react';
import { Button, Col, Container, Row , Image} from "react-bootstrap";
import { Route, Routes, useNavigate} from 'react-router-dom';
import MyCourses from './MyCourses';
import ProfilePage from './ProfilePage';
import Courses from './Courses';
import Community from './Community';
import Setting from './Setting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faGraduationCap, faInfo, faPlug, faSignOut, faUniversity, faUsers,  } from '@fortawesome/free-solid-svg-icons'

/* For using icons refer this docs guys 
*****************
https://fontawesome.com/v5/docs/web/use-with/react
https://fontawesome.com/v4/icons/ ** couldn't find v5 doc so i used this instead, this will do ;)
*****************
*/

/** 
  *@author github.com/daser46
  Dashboard SFC
*/

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

const Dashboard = ({userData,setCourseID}) => {
    const navigate = useNavigate();
    const [activeButtonId, setActiveButtonId] = useState(0);
    const [user, setUser] = useState(localStorage.getItem('user') || null);
    const handleButtonClick = (id) => {
        setActiveButtonId(id);
    }
    const navigatorControlls = () => {
        navigate('about');
    }
    function swithTab(activeButtonId){
        switch (activeButtonId) {
            case 0:
                return <Courses setCourseID={setCourseID} username={user.username}/>;
            case 1:
                 return <MyCourses setCourseID={setCourseID} username={user.username}/>;
            case 2:
                 return <Community username= {user.username}/>;
            case 3:
                return <Setting/>;
            case 5:
                return <ProfilePage username={user.username}/>
            default:
                return <MyCourses setCourseID={setCourseID} username={user.username}/>;
        }
    }
    const fetchData = async () => {
        try {
            if (!userData) {
                navigate('/login');
                return;   
            }
            const response = await fetch('http://localhost/educonnect/php/fetchUserData.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userData}),
          });
  
          const responseData = await response.json();
          if (responseData.length > 0) {
            const userDetails = responseData[0];
            setUser(userDetails); // Set the user state when data is ready
          } else {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
    };

    useEffect(() => {
        if(!user){
            fetchData();
        }
        // Call the fetchData function
    }, [userData,navigate]);

    if (!user) {
        // Return loading or placeholder content while waiting for the data
        return <Container className="text-center">Loading...</Container>;
    }

    /**
     * @author github.com/daser46
     * simple logout - clearing local data
     */
    const logOut = () => {
        localStorage.removeItem("userData");
        window.location.replace('/login');
    }
    return(
        <Container fluid>
            <Routes>
                
            </Routes>
            <Row>
                <Col xs={1} className="drawer">
                    <Row className='d-flex flex-coumn profile'>
                        <Image src={`${user.avatar}`} alt='avatar' className="avatar" roundedCircle style={{width :'120px', height:'auto'}}/>
                        <Button variant = 'link' onClick={() => handleButtonClick(5)} style={{color :'aliceblue'}}>{user.username}</Button>
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
                        onClick={navigatorControlls}
                        />
                        <hr/>
                        <Button variant='link' style={{color: 'white'}} onClick={logOut}><FontAwesomeIcon icon={faSignOut}/>&nbsp;&nbsp;&nbsp;Log Out </Button>
                        <Col style={{ textAlign: 'center', color: 'white', padding: '5px'}}> © Golden Pro, Inc. All rights reserved.</Col>
                    </Row>
                </Col>
                <Col fluid id="renderScreen">
                    {swithTab(activeButtonId)}
                </Col>
          
            </Row>
        </Container>
    );
}
export default Dashboard;