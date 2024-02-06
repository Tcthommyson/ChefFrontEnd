import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';

function AuthNav() {
  const [pfplink, setPfp] = useState("https://github.com/mdo.png")
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch("/api/logout/", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })
    if(response.ok){
      navigate('/login')
    }
  }

  useEffect(()=>{
    (async ()=>{
        const response = await fetch("/api/chef", {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          })
        
        if(response.ok){
            const content = await response.json()
            setPfp(content.profilepic)
        }
    })()
  })

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Pubchef (Logo)
      </Navbar.Brand>
      <Nav className="me-auto mb-2 justify-content-center mb-md-0">
        <Nav.Link as={Link} to="/post">
        <Button variant="success" className="rounded-pill px-3" type="button">
        New Posting
        </Button>
        </Nav.Link>
        <Nav.Link as={Link} to="/">
        <Button variant="success" className="rounded-pill px-3" type="button">
        Manage Posts
        </Button>
        </Nav.Link>
      </Nav>
      <Dropdown align="end">
        <Dropdown.Toggle as={Nav.Link} variant="link" id="dropdown-basic">
          <img src={pfplink} alt="mdo" width="32" height="32" className="rounded-circle" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/settings">
            Settings
          </Dropdown.Item>
          <Dropdown.Item href="#">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
}

export default AuthNav;