import React from "react";
import './LoginSignup.css'

import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import { useState } from "react";


const Login = () => {

    const [action, setAction] = useState("Sign Up");

    return (
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
                    <input type="email" placeholder="Email ID" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>

            <div>
                <div className="forgot-password">
                    Lost Password? <span>Click here!</span>
                </div>
            </div>

            <div className="submit-container">
                <div className='submit' onClick={() => { setAction("Sign Up") }}>
                    Login
                </div>
            </div>

        </div>
    )
}

export default Login;