import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/waitlist.css';
import { useNavigate } from 'react-router-dom';
import { message } from "antd";

const DisplayWaitlist = () => {
    const [waitlistData, setWaitlistData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const req = await axios.get("http://localhost:5000/api/display-waitlist", {
                const req = await axios.get("https://flash-card-backend-ten.vercel.app/api/display-waitlist", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('headToken')}` 
                    }
                });
                // const updatedData = req.data.map(user => ({ ...user, isApproved: false })); 
                console.log(req.data.data);
                setWaitlistData(req.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const navigate = useNavigate();
    const handleApproveAdmin = async (username, passwor, email, id) => {


        try {
            // const response = await fetch('http://localhost:5000/api/signup', {
            const response = await fetch('https://flash-card-backend-ten.vercel.app/api/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, passwor, email })
            })
            const responseBackend = await response.json();
            console.log("response of approving the user" , responseBackend); 
        } catch (error) {
            console.log("error in printing the waitlist", error);
        }

        try {
            // await axios.delete(`http://localhost:5000/api/deleteFromWaitlist/${id}`);
            await axios.delete(`https://flash-card-backend-ten.vercel.app/api/deleteFromWaitlist/${id}`);
            navigate(0);
            console.log("a");
        } catch (error) {
            console.error("Error deleting card:", error);
            console.log("b");
        }

        try {
            await axios.post('https://flash-card-backend-ten.vercel.app/api/email', {username, email, passwor} )
        } catch (error) {
            console.error("Error in sending the conformation email to the user.", error)
        }

    };

    const handleLogout = () => {
        localStorage.removeItem("headToken");
        message.success("You are logout, head!");
        setTimeout(() => {
            navigate("/head");
        }, 2000); 
    }

    return (
        <div>
            <h1>Waitlist is here</h1>
            {
                waitlistData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                waitlistData.map((data) => (
                                    <tr key={data.username}>
                                        <td>{data.username}</td>
                                        <td>{data.password}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleApproveAdmin( data.username, data.password, data.email, data.id )}
                                            >
                                                {data.isApproved ? "Delete-admin" : "Approve-admin"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )
            }

            {localStorage.headToken ? <button onClick={handleLogout}>Logout</button> : ""}
        </div>
    );
}

export default DisplayWaitlist;
