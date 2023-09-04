import React from "react";
import { Link } from "react-router-dom";
import "./Login-Register.css";

export default function Login() {

    function onclick_login() {
        
    }

    return (<>
        <div className="login-box">
            <img src="notes-logo.png" alt="not found" />
            <div style={{color: "#AAC8A7", fontSize: "36px"}}>Notes</div>
            <div className="login-content">Login</div>
            <div className="login-input">
                <input id="login-usr" type="text" placeholder="Username" style={{marginBottom: "5px"}}/> <br />
                <input id="login-pwd" type="password" placeholder="Password" /> <br />
                <button className="login-btn" style={{marginTop: "20px"}} onClick={()=>{onclick_login()}}>Login</button>
            </div>

            <div className="register">
                Do not have account? <br />
                <Link to="/register" className="link-fix"><button className="login-btn" style={{marginTop: "15px"}}>Create Account</button></Link>
            </div>
        </div>
    </>);
};
