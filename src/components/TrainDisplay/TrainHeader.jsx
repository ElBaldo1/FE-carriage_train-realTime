import PropTypes from 'prop-types';
import './TrainDisplay.css';

/**
 * TrainHeader displays key information about a single train service.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.stationName - Name of the departure station.
 * @param {string} props.destination - Destination of the train.
 * @param {string} props.trainName - Train identifier (e.g., S5).
 * @param {string} props.time - Scheduled departure time.
 * @param {string} props.platform - Platform number.
 * @param {string} props.status - Operational status message.
 * @returns {JSX.Element} The rendered header section for a train card.
 */
const TrainHeader = ({ stationName, destination, trainName, time, platform, status }) => (
  <header className="train-card__header">
    <div className="train-card__title-group">
      <h2 className="train-card__title" aria-label={`Service ${trainName} to ${destination}`}>
        {trainName} to {destination}
      </h2>
      <p className="train-card__subtitle" aria-label={`Departing from ${stationName}`}>
        Departing from {stationName}
      </p>
    </div>
    <div className="train-card__meta" aria-label="Departure details">
      <span className="badge bg-primary">Departure {time}</span>
      <span className="badge bg-secondary">Platform {platform}</span>
      <span className="badge bg-success">{status}</span>
    </div>
  </header>
);

TrainHeader.propTypes = {
  stationName: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  trainName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default TrainHeader;
