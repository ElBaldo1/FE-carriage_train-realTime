import React from 'react';
import TrainHeader from './TrainHeader';
import TrainDetails from './TrainDetails';
import CarriageList from './CarriageList';
import './style.css';

const TrainDisplay = ({ station, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="train-display">
          <TrainHeader station={station}/>
          <TrainDetails station={station}/>
          <CarriageList segments={station.segments} direction={station.direction}/>
      </div>
  );
};

export default TrainDisplay;