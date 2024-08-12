import React from 'react';
import './Dashboard.css';

const Dashboard = ({ question, answer, setQuestion, setAnswer, handleAddFlashcard, isEditing }) => {
    return (
        <div className="dashboard-section">
            <h2>{isEditing ? "Edit Flashcard" : "Add New Flashcard"}</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button onClick={handleAddFlashcard}>
                    {isEditing ? "Update Flashcard" : "Add Flashcard"}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
