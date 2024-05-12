import React from 'react';
import './style.css';

const TrainDetails = ({ station }) => {
  return (
    <div className="train-details">
      <p>{station.details}</p>
    </div>
  );
};

export default TrainDetails;
