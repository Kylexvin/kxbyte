import React from 'react';
import './Card.css';

const Card = ({ title, description, buttonText = "Explore", onButtonClick, isActive }) => {
  return (
    <div className={`card ${isActive ? 'card--active' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Card;