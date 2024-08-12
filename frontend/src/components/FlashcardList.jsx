import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './FlashCard';
import './FlashcardList.css';

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        // Fetch all flashcards from the backend
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => {
                setFlashcards(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the flashcards!', error);
            });
    }, []);

    return (
        <div className="flashcard-list">
            {flashcards.map(flashcard => (
                <Flashcard key={flashcard.id} flashcard={flashcard} />
            ))}
        </div>
    );
};

export default FlashcardList;
