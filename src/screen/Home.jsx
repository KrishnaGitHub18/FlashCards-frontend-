import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [index, setIndex] = useState(0);

    const [cardData, setCardData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = await axios.get("http://localhost:5000/api/displaydata");
                console.log(req.data);
                setCardData(req.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const handleDelete = async (e) => {
        try {
            await axios.delete(`https://flash-card-backend-ten.vercel.app/api/delete-data/${cardData[index].cardid}`);
            navigate(0);
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    }

    const handleEdit = async (e) => {
        try {
            global.curr_idx = index ;
            navigate("/edit",  { 
                state: 
                    { 
                        curr_idx: cardData[index].cardid,
                        curr_que: cardData[index].cardque,
                        curr_ans: cardData[index].cardans
                    } 
                }
            );
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    }


    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const navigate = useNavigate();
    return (
        <div className='main-div'>

            <div className='icons'>
                <i className="fas fa-marker" style={{ fontSize: '35px', color: '#000' }} onClick={() => navigate("/add")}></i>
                <i className="fas fa-trash-alt" style={{ fontSize: '35px', color: '#000' }} onClick={handleDelete}></i>
                <i className="fas fa-edit" style={{ fontSize: '35px', color: '#000' }} onClick={handleEdit}></i>
            </div>

            <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
                <div className="content">
                    {
                        cardData.length > 0
                            ? <>
                                <div class="front">
                                    <h2>QUESTION</h2>
                                    <p>
                                        {cardData[index].cardque}
                                    </p>
                                </div>
                                <div class="back">
                                    <h2>ANSWER</h2>
                                    <p>
                                        {cardData[index].cardans}
                                    </p>
                                </div>
                            </>
                            : ""
                    }
                </div>
            </div>


            <div className="buttons">
                <button
                    className="button-64"
                    onClick={() => { index ? setIndex(index - 1) : console.log('1st element') }}
                >
                    <span class="text">Left</span>
                </button>

                <button
                    className="button-64"
                    onClick={() => { index === cardData.length - 1 ? console.log('Last Element') : setIndex(index + 1) }}
                >
                    <span class="text">Right</span>
                </button>
            </div>
        </div>
    )
}


export default Home;
