import React, {useEffect, useState} from 'react';
import { Dropdown, DropdownButton, Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import DefNav from './Navbars/DefNav';
import AuthNav from './Navbars/AuthNav';
import './Home.css'
// Make a navbar component for users that are signed in and one for users that aren't
// Split this page up into components only later on with the login logic
import Card from 'react-bootstrap/Card';

function ItemBox({ item }) {
  return (
  <Card style={{ width: '18rem', marginBottom: '10px' }}>
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>
        <strong>Price:</strong> {item.price} <br />
        <strong>Description:</strong> {item.description} <br />
        <strong>Chef:</strong> {item.chef} <br />
        <strong>Available:</strong> {item.available ? 'Yes' : 'No'}
      </Card.Text>
    </Card.Body>
  </Card>
  );
}



function Home() {
  const [userid, setUserid] = useState('');
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null)
  const [currentPage, setCurrentPage] = useState('/api/item?page=1');
  const [prevPage, setPrevPage] = useState(null);

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
  }, [])

  useEffect(() => {
    (async () => {
      const response = await fetch(currentPage);
      if(response.ok){
      const data = await response.json();
      setItems(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      }
    })()
  }, [currentPage]);

  const handleNext = () => {
    if (nextPage) {
      setCurrentPage(nextPage);
    }
  };

  const handlePrevious = () => {
    if (prevPage) {
      setCurrentPage(prevPage);
    }
  };

  function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownTitle, setDropdownTitle] = useState('Search by...');
  
    const handleSearch = (event) => {
      event.preventDefault();
      console.log(searchTerm); // Check dropdownTitle and search term and setCurrentPage accordingly
    };
  
    return(
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
    );
  }
  
  return (
      <>
          {userid ? <AuthNav /> : <DefNav />}
          <SearchBar></SearchBar>
            <Row className="align-items-center">
              {items.map((item) => (
                <Col sm={10} md={6} lg={2} className="mb-3" key={item.id}>
                  <ItemBox item={item} />
                </Col>
              ))}
            </Row>
            <Row>
              <Col className="text-center">
                <Button onClick={handlePrevious} disabled={!prevPage}>
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!nextPage}>
                  Next
                </Button>
              </Col>
            </Row>
      </>
  );
}

export default Home;