import React from 'react';
import './style.css';

const Carriage = ({ number, features }) => {
    return (
        <div className={`carriage ${features.includes('wheelchair') ? 'accessible' : ''}`}>
            <div className="carriage-info">
                <div>{number}</div>
                <div className="carriage-features">
                    {features.includes('bike') && <span className="icon-bike">🚲</span>}
                    {features.includes('wheelchair') && <span className="icon-wheelchair">♿</span>}
                </div>
            </div>
        </div>
    );
};

const CarriageList = ({ segments,direction }) => {
    return (
        <div className="train-display">
            <div className="line-container">
                {direction === 'left' && (
                    <div className="direction-arrow">
                        <div>←</div>
                        <div>←</div>
                        <div>←</div>
                    </div>
                )}                {segments.map((segment, index) => (
                <div key={index} className="segment">
                    <div className="segment-letter">{String.fromCharCode(65 + index)}</div>
                    {segment.carriages.map((carriage, index) => (
                        <Carriage key={index} number={carriage.number} features={carriage.features} />
                    ))}
                </div>
            ))}
                {direction === 'right' && (
                    <div className="direction-arrow">
                        <div>→</div>
                        <div>→</div>
                        <div>→</div>
                    </div>
                )}            </div>
        </div>
    );
};

export default CarriageList;
