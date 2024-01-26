import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'
import AuthNav from "../Navbars/AuthNav";

// Add a delete account button

function SettingsPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

  function validateEmail(email) { 
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
  }

  function validateName(name){
      const pattern = /^[A-Za-z]+(?:[A-Za-z]+)*$/;
      return pattern.test(name)
  }

    useEffect(()=>{
        (async ()=>{
            const response = await fetch("/api/user", {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
              })
            
            if(response.ok){
                const content = await response.json()
                setFirstName(content.first_name)
                setLastName(content.last_name)
                setEmail(content.email)
            }
            else{
                navigate('/login') // If user not logged in redirect to login page. 
            }
        })()
      }, [])

    const handleSubmit = async (e) => {
        // Send PUT request to server with updated user information after checking with validate_email() and make oldpw and confpw the same
        e.preventDefault()
        if (!validateName(firstName)) {
          setMessage("Invalid first name");
          return;
        } if (!validateName(lastName)) {
          setMessage("Invalid last name");
          return;
        } if (!validateEmail(String(email).toLowerCase())){
          setMessage("Invalid email.");
          return;
        } if (!oldPassword) {
          setMessage("Password is required");
          return;
        }
        setEmail(String(email).toLowerCase())
        var data = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          oldpassword: oldPassword,
          }
        if(newPassword){
          if(newPassword === confirmNewPassword){
            data['password'] = newPassword
          }
        }
        const response = await fetch("/api/user/", {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        if(!response.ok){ //handle this differently maybe
          const res = await response.json()
          if(res.message === 'Email in use'){
              setMessage("Email in use, please login.")
          } // add an if and check for incorrect password
          if(res.detail === "Incorrect password."){
            setMessage("Incorrect password")
          }
          else{
              setMessage("Error")
          }
          return
        }
        setMessage("Success!")
      };

      const handleDelete = async () => {
        if (!oldPassword) {
          setMessage("Password is required");
          return;
        }
        const response = await fetch("/api/user/", {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            password: oldPassword
          })
        })
        if(!response.ok){
          const res = await response.json()
          if(res.detail === "Incorrect password."){
            setMessage("Incorrect password")
          }
          else{
            setMessage("Error")
          }
          return;
        }
        setMessage("Account deleted.")
      }
    
      return ( // add delete modal from react-bootstrap
       <div>
        <AuthNav></AuthNav>
        <form className='settingform' onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Old Password:
            <input type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} />
          </label>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
          </label>
          <label>
            Confirm New Password:
            <input type="password" value={confirmNewPassword} onChange={(event) => setConfirmNewPassword(event.target.value)} />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" className="delbutton" onClick={handleDelete}>DELETE ACCOUNT</button>
          <div>
            {message}
          </div>
        </form>
       </div>
      );
}

export default SettingsPage