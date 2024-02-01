import React from "react";
import { Card, Container , Row} from "react-bootstrap";

const Notification = ({message, date}) => {
    return (
        <Container className="text-center">
            <Card className="p-10">
                <Row>
                    <Card.Text  style={{fontSize: '12px', display: 'flex'}}>{message}</Card.Text>
                </Row>
                <Row>
                    <Card.Text  style={{fontSize: '10px', display: 'flex'}}>{date}</Card.Text>
</Row>
                
            </Card>
        </Container>
    )
}

export default Notification;