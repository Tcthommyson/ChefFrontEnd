import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Settings.css'

function SettingsPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate()

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
      })

    const handleSubmit = async () => {
        // Send PUT request to server with updated user information after checking with validate_email() and make oldpw and confpw the same
      };
    
      return (
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
        </form>
      );
}

export default SettingsPage