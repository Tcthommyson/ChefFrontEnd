import React from "react";
import './LoginSignup.css'

import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefNav from "../Navbars/DefNav";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate()


    function validateEmail(email) { 
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const submit = async () => { // Add submit disabled?
        if(!validateEmail(email)){
            setMessage("Invalid email.")
            return;
        }
        if(!password){
            setMessage("Provide a password.")
            return;
        }
        setEmail(String(email).toLowerCase())
        const response = await fetch("/api/login/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            })
          })
          if(!response.ok){ //handle this differently
            const res = await response.json()
            if(res.detail === "Incorrect password." || res.detail === "User not found"){
                setMessage("Incorrect email/password")
            }
            else{
                setMessage("Error")
            }
            return
          }
          navigate("/")
    }

    return (
        <div>
            <DefNav></DefNav>
            <div className="container">
                <div className="header">
                    <div className="text">
                        Login
                    </div>
                    <div className="underline"></div>
                </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input type="email" placeholder="Email ID" maxlength="45" onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input type="password" placeholder="Password" maxlength="45" onChange={e => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <div className="forgot-password">
                            Lost Password? <span>Click here!</span>
                        </div>
                    </div>

                    <div className="submit-container">
                        <div className='submit' onClick={submit}>
                            Login
                        </div>
                    </div>
                    <div className="text-center">
                        <p>{message}</p>
                    </div>
            </div>
        </div>
    )
}

export default Login;