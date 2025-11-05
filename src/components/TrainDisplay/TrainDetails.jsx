import PropTypes from 'prop-types';
import './TrainDisplay.css';

/**
 * TrainDetails provides contextual metadata for the train, including the next stops
 * and occupancy insights updated by the live data feed.
 *
 * @param {Object} props - Component properties.
 * @param {string[]} props.nextStops - Ordered list of upcoming stops.
 * @param {string} props.lastUpdated - ISO timestamp representing the last update time.
 * @param {string} props.occupancy - Passenger load indicator.
 * @returns {JSX.Element} The rendered details section for a train card.
 */
const TrainDetails = ({ nextStops, lastUpdated, occupancy }) => {
  const formattedUpdateTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Brussels',
  }).format(new Date(lastUpdated));

  return (
    <section className="train-card__details" aria-label="Service details">
      <div>
        <h3 className="train-card__section-title">Next stops</h3>
        <ul className="train-card__stops">
          {nextStops?.map((stop) => (
            <li key={stop}>{stop}</li>
          ))}
        </ul>
      </div>
      <div className="train-card__status" aria-live="polite">
        <h3 className="train-card__section-title">Live status</h3>
        <p className="train-card__status-item">
          <strong>Occupancy:</strong> {occupancy}
        </p>
        <p className="train-card__status-item">
          <strong>Last update:</strong> {formattedUpdateTime}
        </p>
      </div>
    </section>
  );
};

TrainDetails.propTypes = {
  nextStops: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastUpdated: PropTypes.string.isRequired,
  occupancy: PropTypes.string.isRequired,
};

export default TrainDetails;
