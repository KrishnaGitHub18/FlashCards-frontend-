import React from 'react';
import '../css/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from "antd";

const Login = () => {

    const [username, setUsername] = useState('');
    const [passwor, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', passwor);
        console.log('Email:', email);

        // const response = await fetch('https://flash-card-backend-ten.vercel.app/api/login', {
        // const response = await fetch('http://localhost:5000/api/signup-req', {
        const response = await fetch('https://flash-card-backend-ten.vercel.app/api/signup-req', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, passwor, email })
        })

        const data = await response.json(); // Parse JSON response
        
        if (response.ok) {
            console.log('Signup successful:', data.message);
            message.success('Admin request submitted successfully.');
            setTimeout(() => navigate("/"), 2500);
        } else {
            console.log('Signup failed:', data.message);
            message.error(data.message);
        }

    };


    return (
        <div className='login-main'>
            <div className="form-box">
                <h1>Register</h1>
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

                    {/* EMAIL */}
                    <div className="email">
                        <label>Email  </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* SUBMIT */}
                    <button type="submit" className="submit" onClick={handleSubmit}>
                        Submit
                    </button>

                    <p onClick={()=>{navigate("/login")}}>Login</p>
                </form>
            </div >
        </div >
    )
}

export default Login
