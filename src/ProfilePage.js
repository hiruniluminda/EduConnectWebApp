import React,{useEffect,useState} from 'react';
import './ProfilePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row , Card} from "react-bootstrap";
import ProfileProgress from './ProfileProgress';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Badge from 'react-bootstrap/Badge';
import { useNavigate} from 'react-router-dom';
import EditUserProfile from './EditUserProfile';

/*developed by P.A.H.Niluminda*/


function App({username}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const fetchData = async () => {
        try {
            console.log(username);
            const response = await fetch('http://localhost/educonnect/php/fetchProfile.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),
          });
  
          const responseData = await response.json();
          if (responseData.length > 0) {
            const userDetails = responseData[0];
            setUser(userDetails); // Set the user state when data is ready
          } else {
            console.log('this is emabarrasing');
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
    }, [user,navigate]);

    if (!user) {
        // Return loading or placeholder content while waiting for the data
        return <Container className="text-center">Loading...</Container>;
    }

    const updateDetails = () => {
        console.log('editProfile');
    }
	return (
		<div>
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="container">
        <div class="">
        <div class="panel profile-cover">
            <div class="profile-cover__img">
            <img src={user.avatar} alt="Logo" style={{ width: '200px', height: 'auto' }} />
                <h3 class="h3">{username}</h3>
            </div>
            <div class="profile-cover__action bg--img" data-overlay="0.3">
                <button class="btn-info btn btn-sm btn-rounded" onClick={() => {updateDetails();}}>
                    <i class="fa fa-plus"></i>
                    <span>Edit Profile</span>
                </button>
                <button class="btn-info btn btn-sm btn-rounded">
                    <span>Progress</span>
                </button>
            </div>
            <div class="profile-cover__info">
                <ul class='details'>
                    <li>E-mail address:<span id='spacedet'>{user.email}</span></li>
                    <li>date of birth:<span id='spacedet'>{user.date_Of_birth}</span></li>
                </ul>
                <ul class="nav">
                    <li><p className='point'><Badge bg="secondary">{user.point}</Badge></p>points</li>
                    <li><p className='point'><Badge bg="secondary">{user.spentTime}</Badge></p>Spended Time</li>
                    <li><div class="progressxx" style = {{ width: "120px"}}>
                <CircularProgressbar value = {user.level/100} text = {`Level ${user.level}`} />
         </div></li>
                </ul>
               
            </div>
            
        </div>

    
        </div>
                <Col className='d-flex' fluid id="renderScreen" style={{flexDirection:"column",maxHeight:"15rem",overflow:"auto",height:"18rem"}}>
                    <Row><Card.Text>Completed Courses!</Card.Text> </Row>
                    <Row><ProfileProgress/></Row>
                </Col>
        </div>

		</div>
	);
}
export default App;