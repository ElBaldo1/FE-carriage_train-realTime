import PropTypes from 'prop-types';

import CarriageList from './CarriageList';
import TrainDetails from './TrainDetails';
import TrainHeader from './TrainHeader';
import StatusMessage from '../common/StatusMessage';
import './TrainDisplay.css';

/**
 * TrainDisplay renders the full schedule view, including loading and error states.
 * It lists the available train services matching the selected station.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.trains - Collection of train data returned by the live API.
 * @param {boolean} props.loading - Indicates whether data is being fetched.
 * @param {string|null} props.error - Optional error message.
 * @returns {JSX.Element} The rendered train schedule section.
 */
const TrainDisplay = ({ trains = [], loading = false, error = null }) => {
  if (loading) {
    return <StatusMessage message="Loading live train data..." tone="info" role="status" />;
  }

  if (error) {
    return <StatusMessage message={error} tone="danger" role="alert" />;
  }

  if (!trains?.length) {
    return <StatusMessage message="No trains available for the selected station." tone="secondary" role="status" />;
  }

  return (
    <section aria-label="Train search results" className="train-display">
      {trains.map((train) => (
        <article className="train-card" key={train.id}>
          <TrainHeader
            destination={train.destination}
            platform={train.platform}
            stationName={train.stationName}
            status={train.status}
            time={train.time}
            trainName={train.trainName}
          />
          <TrainDetails lastUpdated={train.lastUpdated} nextStops={train.nextStops} occupancy={train.occupancy} />
          <CarriageList direction={train.direction} segments={train.segments} />
        </article>
      ))}
    </section>
  );
};

TrainDisplay.propTypes = {
  trains: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      stationName: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      trainName: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      nextStops: PropTypes.arrayOf(PropTypes.string).isRequired,
      segments: PropTypes.arrayOf(
        PropTypes.shape({
          carriages: PropTypes.arrayOf(
            PropTypes.shape({
              number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
              features: PropTypes.arrayOf(PropTypes.string),
            })
          ),
        })
      ).isRequired,
      direction: PropTypes.oneOf(['left', 'right']).isRequired,
      occupancy: PropTypes.string.isRequired,
      lastUpdated: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default TrainDisplay;
