import React from 'react';
import './FlashcardActions.css';

const FlashcardActions = ({ handleEdit, handleDelete }) => {
    return (
        <div className="flashcard-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default FlashcardActions;
