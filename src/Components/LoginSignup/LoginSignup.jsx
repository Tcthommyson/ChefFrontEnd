import React from "react";
import './LoginSignup.css'

import user_icon from '../Assets/person.png';
import last_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';
import { useState } from "react";


const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className="container">
            <div className="header">
                <div className="text">
                    {action}
                </div>
                <div className="underline">
            </div>
            </div>
            {action === "Sign Up" &&
            <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="firstname" placeholder="First Name" />
                    </div>
            </div>
            }
            {action === "Sign Up" &&
            <div className="inputs">
                    <div className="input">
                        <img src={last_icon} alt="" />
                        <input type="lastname" placeholder="Last Name" />
                    </div>
            </div>
            }
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
                {action === "Sign Up" ? <div></div> :
                    <div className="forgot-password">
                        Lost Password? <span>Click here!</span>
                    </div>
                }
            </div>

            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>
                    Sign Up
                </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>
                    Login
                </div>
            </div>

        </div>
    )
}

export default LoginSignup;