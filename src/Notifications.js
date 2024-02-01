import React, {useState,useEffect} from "react";
import { Row,Button, Container } from "react-bootstrap";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

// const notifications = [
// {
//     id: 1,
//     message: "this is a notification",
//     date : '11/8/2023'
// },
// {
//     id: 2,
//     message: "this is a notification",
//     date : '11/8/2023'
// },
// {
//     id: 3,
//     message: "this is a notification",
//     date : '11/8/2023'
// },
// {
//     id: 4,
//     message: "this is a notification",
//     date : '11/8/2023'
// },
// {
//     id: 5,
//     message: "this is a notification",
//     date : '11/8/2023'
// }]
const Notifications = ({username}) => {
    const navigate = useNavigate();
    const [notifications,setNotification] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/educonnect/php/fetchNotifications.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),
          });
  
          const responseData = await response.json();
          if (responseData.length > 0) {
            //const userDetails = responseData[0];
            setNotification((notifications) => [...notifications, responseData]);
          } 
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container className="text-center p-3 flex-grow-1 justify-content-center" style={{border: '1px solid rgb(200,200,200)', boxShadow: '2px 1px 4px rgba(0,0,0, 0.4)'}}>
            Notifications
            <Container className="p-2" style={{background: 'rgb(230,230,230)', borderRadius: '1rem', minHeight: '80vh'}}>
               {notifications.length > 0 ? notifications.map(n => ( n.map(i =>
                <Notification
                message={i.text}
                date={i.date}
                />
               )
               )): 'you have no notifications!'}
            </Container>
            <Row>
                <Button variant="primary-outline">clear all</Button>
            </Row>
        </Container>
    )
}

export default Notifications;