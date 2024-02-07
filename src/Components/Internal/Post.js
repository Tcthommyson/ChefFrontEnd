import React from "react";
import AuthNav from "../Navbars/AuthNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function Post(){ // Add rate limiting, chef limits
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [available, setAvailable] = useState(false)
    const [price, setPrice] = useState(0)
    const [message, setMessage] = useState()
    const [submitEnabled, setSubmitEnabled] = useState(true)

    const navigate = useNavigate()
    useEffect(()=>{
      (async ()=>{
          const response = await fetch("/api/user", {
              headers: {'Content-Type': 'application/json'},
              credentials: 'include'
            })
          if(!response.ok){
            navigate('/login')
          }
      })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name || !desc || price == 0){
          setMessage("Please fill out all fields.")
          return
        }
        setSubmitEnabled(false)
        const response = await fetch("/api/item/", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name,
            price: price,
            available: available,
            description: desc
          })
        })
        if(!response.ok){
          setMessage("Error!")
          setSubmitEnabled(true)
          return;
        }
        setMessage("Success!")
        setTimeout(() => {
          navigate("/")
        }, 500)
    }


    return(
        <div>
        <AuthNav></AuthNav>
          <Form className='settingform' onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control type="text" maxLength="45" onChange={(event) => setName(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={3} maxLength="250" onChange={(event) => setDesc(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formAvailable">
              <Form.Check type="checkbox" label="Available" onChange={(event) => setAvailable(event.target.checked)} />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" step="0.01" min="1.00" max="999.99" onChange={(event) => setPrice(event.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!submitEnabled}>
              Create
            </Button>
            <div>
              {message}
            </div>
          </Form>
    </div>
    )
}

export default Post;