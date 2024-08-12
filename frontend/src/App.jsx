import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './components/FlashCard';
import Navigation from './components/Navigation';
import FlashcardActions from './components/FlashcardActions';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flipped, setFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        // Fetch all flashcards from the backend
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => {
                setFlashcards(response.data);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
            });
    }, []);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setFlipped(false);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
        setFlipped(false);
    };

    const handleAddFlashcard = () => {
        if (isEditing) {
            axios.put(`http://localhost:5000/api/flashcards/${editId}`, { question, answer })
                .then(response => {
                    setFlashcards(flashcards.map(flashcard => 
                        flashcard.id === editId ? response.data : flashcard
                    ));
                    setIsEditing(false);
                    setEditId(null);
                })
                .catch(error => {
                    console.error('Error updating flashcard:', error);
                });
        } else {
            axios.post('http://localhost:5000/api/flashcards', { question, answer })
                .then(response => {
                    setFlashcards([...flashcards, response.data]);
                })
                .catch(error => {
                    console.error('Error adding flashcard:', error);
                });
        }
        setQuestion('');
        setAnswer('');
    };

    const handleDeleteFlashcard = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => {
                setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
                if (currentIndex >= flashcards.length - 1) {
                    setCurrentIndex(flashcards.length - 2);
                }
            })
            .catch(error => {
                console.error('Error deleting flashcard:', error);
            });
    };

    const handleEditFlashcard = (id) => {
        const flashcard = flashcards.find(flashcard => flashcard.id === id);
        setQuestion(flashcard.question);
        setAnswer(flashcard.answer);
        setIsEditing(true);
        setEditId(id);
    };

    return (
        <div className="container">
            <div className="flashcard-section">
                {flashcards.length > 0 && (
                    <Flashcard
                        flashcard={flashcards[currentIndex]}
                        flipped={flipped}
                        handleFlip={handleFlip}
                    />
                )}
                
                {flashcards.length > 0 && (
                    <FlashcardActions
                        handleEdit={() => handleEditFlashcard(flashcards[currentIndex].id)}
                        handleDelete={() => handleDeleteFlashcard(flashcards[currentIndex].id)}
                    />
                )}
                <Navigation handlePrevious={handlePrevious} handleNext={handleNext} />
            </div>
            <Dashboard
                question={question}
                answer={answer}
                setQuestion={setQuestion}
                setAnswer={setAnswer}
                handleAddFlashcard={handleAddFlashcard}
                isEditing={isEditing}
            />
        </div>
    );
};

export default App;
