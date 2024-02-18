import React from "react";
import AuthNav from "../Navbars/AuthNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";

function ManagePosts(){ // Add rate limiting, chef limits
    const [selectedItem, setSelectedItem] = useState('Select item...')
    const [selectedItemId, setSelectedItemId] = useState()
    const [selected, setSelected] = useState(false)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [available, setAvailable] = useState(false)
    const [items, setItems] = useState([])
    const [price, setPrice] = useState(0)
    const [message, setMessage] = useState()
    const [submitEnabled, setSubmitEnabled] = useState(true)

    const navigate = useNavigate()
    useEffect(()=>{
      (async ()=>{
          const response = await fetch("/api/chef", {
              headers: {'Content-Type': 'application/json'},
              credentials: 'include'
            })
          if(!response.ok){
            navigate('/login')
          }
          const content = await response.json()
          const resitems = await fetch("/api/item?chefid="+content.id, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          })
          if(!resitems.ok){ //Print error instead
          navigate('/login')
          }
          const itemcontent = await resitems.json()
          setItems(itemcontent.results)
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
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: selectedItemId,
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

    function ManageForm() {
      const [currentname, setCurrName] = useState('')
      const [currentdesc, setCurrDesc] = useState('')
      const [currentavailable, setCurrAvailable] = useState(false)
      const [currentprice, setCurrPrice] = useState(0) 
      useEffect(()=>{
        (async ()=>{
            const response = await fetch("/api/item?id="+selectedItemId, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
              })
            if(!response.ok){
              navigate('/login')
            }
            const content = await response.json()
            setCurrName(content.name)
            setCurrAvailable(content.available)
            setCurrDesc(content.description)
            setCurrPrice(content.price)
        })()
      }, [])
      
      return(
        <Form className='settingform' onSubmit={handleSubmit}>
            <Form.Group controlId="formItemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control type="text" value={currentname} maxLength="45" onChange={(event) => setName(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" value={currentdesc} rows={3} maxLength="250" onChange={(event) => setDesc(event.target.value)} />
            </Form.Group>

            <Form.Group controlId="formAvailable">
              <Form.Check type="checkbox" checked={currentavailable} label="Available" onChange={(event) => setAvailable(event.target.checked)} />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" value={currentprice} step="0.01" min="1.00" max="999.99" onChange={(event) => setPrice(event.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!submitEnabled}>
              Update
            </Button>
            <div>
              {message}
            </div>
          </Form>
      )
    }
    return(
        <>
        <AuthNav></AuthNav>
        <DropdownButton id="dropdown-basic-button" title={selectedItem} variant="primary" onSelect={(eventKey, event) => {
          setSelected(true)
          setSelectedItemId(eventKey)
          setSelectedItem(items.find(item => eventKey == item.id).name)
          }}>
          {items.map((item) => (
                <Dropdown.Item eventKey={item.id}>{item.name}</Dropdown.Item>
          ))}
        </DropdownButton>
        {selected && <ManageForm></ManageForm>}
        </>
    )
}

export default ManagePosts;