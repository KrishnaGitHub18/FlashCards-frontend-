import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddCard.css'; 
import { useLocation, useNavigate } from 'react-router-dom';

const AddCard = () => {
    const [cardQue, setCardQue] = useState('');
    const [cardAns, setCardAns] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const location = useLocation();
    const curr_idx = location.state?.curr_idx;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/edit-data/${curr_idx}`, {
                cardque: cardQue,
                cardans: cardAns,
            });
            setMessage('Card edited successfully!');            
            setCardQue('');
            setCardAns('');
            navigate('/');
        } catch (error) {
            console.error("Error edited card:", error);
            setMessage('Failed to edit card.');
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
                <button type='submit'>Add Card</button>
                {message && <p className='message'>{message}</p>}
            </form>
        </div>
    );
};

export default AddCard;
