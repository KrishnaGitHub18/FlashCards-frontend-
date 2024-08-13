import React from 'react';
import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from "antd";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);

        const response = await fetch('https://flash-card-backend-ten.vercel.app/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        const dataValidity = await response.json();
        console.log("data123" , dataValidity);        //////////////////////////
        
        if (!dataValidity.success) {
            message.error("Wrong credentials");
            setTimeout(() => {
                navigate("/");
                message.error("Directed as a user");
            }, 2000); 
        }
        else {
            localStorage.setItem("authToken", dataValidity.authToken);
            console.log(localStorage.authToken);
            navigate("/");
            message.success("You are login as a admin");
        }
    };


    return (
        <div className='login-main'>
            <div className="form-box">
                <h1>Admin Login</h1>
                <form>

                    {/* NAME  */}
                    <div className="name">
                        <label>Username:  </label>
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="password">
                        <label>Password:  </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* SUBMIT */}
                    <button type="submit" className="submit" onClick={handleSubmit}>
                        Submit
                    </button>

                </form>
            </div >
        </div >
    )
}

export default Login
