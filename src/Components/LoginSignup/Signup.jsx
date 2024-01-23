import React from "react";
import './LoginSignup.css'

import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import { useState } from "react";
import DefNav from "../Navbars/DefNav";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState();
    const [redir, setRedir] = useState(false);
    const navigate = useNavigate();

// Should also validate and ensure strong password, and limit requests by redirecting
    function validateEmail(email) { 
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function validateName(name){
        const pattern = /^[A-Za-z]+(?:[A-Za-z]+)*$/;
        return pattern.test(name)
    }

    const submit = async () => {
        if (!validateName(first)) {
            setMessage("Invalid first name");
            return;
          } if (!validateName(last)) {
            setMessage("Invalid last name");
            return;
          } if (!validateEmail(String(email).toLowerCase())){
            setMessage("Invalid email.");
            return;
          } if (!pass) {
            setMessage("Password is required");
            return;
          }
          setEmail(String(email).toLowerCase())
          const response = await fetch("/api/register/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                first_name: first,
                last_name: last,
                email: email,
                password: pass
            })
          })
          if(!response.ok){ //handle this differently maybe
            const res = await response.json()
            if(res.message === 'Email in use'){
                setMessage("Email in use, please login.")
            }
            else{
                setMessage("Error")
            }
            return
          }
          const content = await response.json()
          console.log(content)
          setMessage("Submitted... Redirecting to login.")
          setRedir(true)
    }

    if(redir){
        setTimeout(() => {
            navigate("/login")
        }, 1000)
    }

    return (
        <div>
            <DefNav></DefNav>
            <div className="container">
                <div className="header">
                    <div className="text">
                        Sign Up
                    </div>
                    <div className="underline">
                </div>
                </div>
                <div className="inputs">
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input type="firstname" placeholder="First Name" onChange={e => setFirst(e.target.value)}/>
                        </div>
                </div>
                <div className="inputs">
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input type="lastname" placeholder="Last Name" onChange={e => setLast(e.target.value)}/>
                        </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email ID" onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)}/>
                    </div>
                </div>

                <div className="submit-container">
                    <div className='submit' onClick={submit}>
                        Sign Up
                    </div>
                </div>
                <div className="text-center">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;