import React from 'react';
import './Navigation.css';

const Navigation = ({ handlePrevious, handleNext }) => {
    return (
        <div className="navigation">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Navigation;
