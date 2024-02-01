import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';

/*developed by P.A.H.Niluminda*/


const Trow = (type,weighted,marks) => {
    return(
        <tr>
            <td>{type}</td>
            <td>{weighted}</td>
            <td>{marks}</td>    
        </tr>
    );
}


const Progress = ({pro,current}) => {
    const data = pro;
    const progress = current['progress']*100;
    console.log(data);
    return(
        <>
            <Container fluid style={{border: '1px solid rgb(200,200,200)', borderRadius: '10px', overflow: 'hidden', boxShadow: '1px 1px 4px rgba(0,0,0, 0.4)', marginBottom: '10px'}}>
                <Row fluid xs={1} style={{backgroundColor: 'rgb(225,225,225)', fontSize: 'large', padding: '1rem'}}>
                    <Col>
                        Your Progress
                    </Col> 
                </Row>
                <Row>
                    <Col className="text-center m-2">
                        <span className="d-flex m-2 ">You have Completed!</span>
                        <ProgressBar now={progress} label={`${[progress]}%`} />
                        <Button variant='danger' className="m-2"> Continue </Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{border: '1px solid rgb(200,200,200)', borderRadius: '10px', overflow: 'hidden'}}>
                <Row fluid xs={1} style={{backgroundColor: 'rgb(225,225,225)', fontSize: 'large', padding: '1rem'}}>
                    <Col>
                        Your Marks
                    </Col> 
                </Row>
                <Row>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Weighted</th>
                                <th>Your marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.module_Type}</td>
                                <td>{item.module_weighted}</td>
                                <td>{item.module_marks}</td>
                            </tr>
                            ))}      
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
}
export default Progress;