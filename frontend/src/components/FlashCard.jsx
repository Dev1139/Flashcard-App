import React from 'react';
import './FlashCard.css';

const Flashcard = ({ flashcard, flipped, handleFlip }) => {
    return (
        <div className="flashcard" onClick={handleFlip}>
            <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
                <div className="flashcard-front">
                    {flashcard.question}
                </div>
                <div className="flashcard-back">
                    {flashcard.answer}
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
