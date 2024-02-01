import './App.css';
import React,{ useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from './assets/logo.png';
import Login from './Login';
import Register from './Register';
/** 
  *@author github.com/daser46
  login and register with fire base
*/

const App = ({setUserData}) => {
  var [page, setPage] = useState(true);
  const changePage = () => {
    setPage((prevState) => !prevState);
  }
  return (
    <Container fluid>
    <Row className='blue'>
      <Col fluid>
        <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', margin: '2em' }} />
      </Col>
    </Row>
    <Row className='lightblue'>
      <Col fluid></Col>
    </Row>
    <Row className='blue footer'>
      <Col fluid style={{ textAlign: 'center', color: 'white', padding: '5px'}}>
        © Golden Pro, Inc. All rights reserved.
      </Col>
    </Row>
    <Container className='formWrapper'>
      <div>
        {page ? <Login setUserData={setUserData} /> : <Register />}
      </div>
      <div className="d-grid gap-2">
          <Button variant="link" onClick={changePage}>
            Sign {page ? 'up' : 'in'} Here
          </Button>
      </div>
    </Container>
  </Container>
  );
}
export default App;
