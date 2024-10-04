import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddCard.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCard = () => {

    const location = useLocation();
    const curr_idx = location.state?.curr_idx;
    const curr_que = location.state?.curr_que;
    const curr_ans = location.state?.curr_ans;

    const [cardQue, setCardQue] = useState(curr_que);
    const [cardAns, setCardAns] = useState(curr_ans);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if (!localStorage.authToken) {
            alert('unauthorized user');
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
        else {
            e.preventDefault();
            try {
                const response = await axios.put(`https://flash-card-backend-ten.vercel.app/api/edit-data/${curr_idx}`, 
                {
                    cardque: cardQue,
                    cardans: cardAns,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('headToken')}`
                    }
                }   
            );
                setMessage('Card edited successfully!');
                setCardQue('');
                setCardAns('');
                navigate('/');
            } catch (error) {
                console.error("Error edited card:", error);
                setMessage('Failed to edit card.');
            }
        }
    };

    return (
        <div className='add-card-container'>
            <h1>Edit Card Page</h1>
            <form onSubmit={handleSubmit} className='add-card-form'>
                <div className='form-group'>
                    <label htmlFor='cardQue'>Question:</label>
                    <textarea
                        id='cardQue'
                        value={cardQue}
                        onChange={(e) => setCardQue(e.target.value)}
                        placeholder='Enter the question'
                        required
                    ></textarea>
                </div>
                <div className='form-group'>
                    <label htmlFor='cardAns'>Answer:</label>
                    <textarea
                        id='cardAns'
                        value={cardAns}
                        onChange={(e) => setCardAns(e.target.value)}
                        placeholder='Enter the answer'
                        required
                    ></textarea>
                </div>
                <button type='submit'>Edit Card</button>
                {message && <p className='message'>{message}</p>}
            </form>
        </div>
    );
};

export default AddCard;
