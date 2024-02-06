import React, {useEffect, useState} from 'react';
import { Dropdown, DropdownButton, Container, Row, Col, Form, FormControl } from 'react-bootstrap';
import DefNav from './Navbars/DefNav';
import AuthNav from './Navbars/AuthNav';
import './Home.css'
// Make a navbar component for users that are signed in and one for users that aren't
// Split this page up into components only later on with the login logic

function Home() {
  const [userid, setUserid] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownTitle, setDropdownTitle] = useState('Search by...');

  useEffect(()=>{
    (async ()=>{
        const response = await fetch("/api/user", { //change this so that its less requests, can send data to stuff like authnav. Also fix multiple renders and requests?
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          })
        
        if(response.ok){
            const content = await response.json()
            setUserid(content.id)
        }
    })()
  })
  //separate the search bar into another component

  const handleSearch = (event) => {
      event.preventDefault();
      console.log(searchTerm); // replace this with your search logic
  };

  return (
      <>
          {userid ? <AuthNav /> : <DefNav />}
          <Container className="pt-3 bg-transparent">
              <Row className="d-flex align-items-center">
                  <Col xs='auto'>
                      <DropdownButton 
                          id="dropdown-basic-button" 
                          title={dropdownTitle} 
                          variant="primary" 
                          onSelect={(eventKey, event) => setDropdownTitle(eventKey)}
                      >
                          <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
                          <Dropdown.Item eventKey="Chef Name">Chef Name</Dropdown.Item>
                          <Dropdown.Item eventKey="Cuisine">Cuisine</Dropdown.Item>
                      </DropdownButton>
                  </Col>
                  <Col xs>
                      <Form role="search" onSubmit={handleSearch}>
                          <FormControl 
                              className="form-control" 
                              type="search" 
                              placeholder="Search" 
                              aria-label="Search" 
                              value={searchTerm} 
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </Form>
                  </Col>
              </Row>
          </Container>
      </>
  );
}

export default Home;