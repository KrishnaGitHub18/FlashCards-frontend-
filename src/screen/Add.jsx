import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddCard.css';
import { useNavigate } from 'react-router-dom';


const AddCard = () => {
    const [cardQue, setCardQue] = useState('');
    const [cardAns, setCardAns] = useState('');
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
                const response = await axios.post('https://flash-card-backend-ten.vercel.app/api/add-data', {
                    cardque: cardQue,
                    cardans: cardAns,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('headToken')}`
                    }
                });
                setMessage('Card added successfully!');
                setCardQue('');
                setCardAns('');
                navigate("/");
            } catch (error) {
                console.error("Error adding card:", error);
                setMessage('Failed to add card.');
            }
        }
    };

    return (
        <div className='add-card-container'>
            <h1>Add a New Card</h1>
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
