import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddCard.css'; 

const AddCard = () => {
    const [cardQue, setCardQue] = useState('');
    const [cardAns, setCardAns] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/add-data', {
                cardque: cardQue,
                cardans: cardAns,
            });
            setMessage('Card added successfully!');
            setCardQue('');
            setCardAns('');
        } catch (error) {
            console.error("Error adding card:", error);
            setMessage('Failed to add card.');
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
