import React from 'react';
import './style.css';

const TrainHeader = ({ station }) => {
    return (
        <div className="train-header">
            <div className="header-top">
                <h1>{station.time}</h1>
                <h1 className="train-name">{station.trainName}</h1>
            </div>
            <h1 style={{ color: 'yellow' }}>{station.stationName}</h1>
            <h3>This train stops in: </h3>
            <h3>{station.nextStops.join(', ')}</h3>
            <h4 className="spaced">Travelers to <span style={{ color: 'yellow' }}>{station.destination}</span>:<b> do not board </b> the first 4 coaches in <b>Zone D & E</b></h4>
        </div>
    );
};

export default TrainHeader;