import PropTypes from 'prop-types';
import './TrainDisplay.css';

const FEATURE_LABELS = {
  bike: { abbreviation: 'Bike', label: 'Bicycle storage available' },
  wheelchair: { abbreviation: 'Accessible', label: 'Wheelchair accessible carriage' },
  quiet: { abbreviation: 'Quiet', label: 'Quiet zone carriage' },
};

/**
 * Carriage renders an individual train carriage along with feature badges.
 *
 * @param {Object} props - Component properties.
 * @param {number|string} props.number - Carriage number or identifier.
 * @param {string[]} props.features - List of feature keys for the carriage.
 * @returns {JSX.Element} The rendered carriage.
 */
const Carriage = ({ number, features = [] }) => (
  <div className="carriage" data-testid="carriage">
    <div className="carriage__number" aria-label={`Carriage ${number}`}>
      {number}
    </div>
    <ul className="carriage__features" aria-label={`Features for carriage ${number}`}>
      {features?.length ? (
        features.map((feature) => {
          const featureDetails = FEATURE_LABELS[feature] ?? {
            abbreviation: feature,
            label: feature,
          };

          return (
            <li className="carriage__feature" key={`${number}-${feature}`}>
              <span aria-label={featureDetails.label} className="badge bg-info text-dark">
                {featureDetails.abbreviation}
              </span>
            </li>
          );
        })
      ) : (
        <li className="carriage__feature">
          <span className="badge bg-light text-muted" aria-label="No specific features">
            Standard
          </span>
        </li>
      )}
    </ul>
  </div>
);

Carriage.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
};

/**
 * CarriageList renders all carriage segments for a train and visually communicates the direction of travel.
 *
 * @param {Object} props - Component properties.
 * @param {{ carriages: { number: number|string, features: string[] }[] }[]} props.segments - Segments for the train.
 * @param {'left'|'right'} props.direction - Indicates the direction of travel relative to the platform map.
 * @returns {JSX.Element} The rendered list of carriages grouped by segments.
 */
const CarriageList = ({ segments = [], direction = 'right' }) => (
  <div className="carriage-list" role="list" aria-label="Train carriage composition">
    <div className="carriage-list__direction" aria-live="polite" aria-label="Direction of travel">
      {direction === 'left' ? 'Departure direction: Left' : 'Departure direction: Right'}
    </div>
    <div className="carriage-list__segments">
      {segments?.map((segment, segmentIndex) => (
        <section
          aria-label={`Segment ${String.fromCharCode(65 + segmentIndex)}`}
          className="carriage-list__segment"
          key={`segment-${segmentIndex}`}
          role="group"
        >
          <header className="carriage-list__segment-header">
            <span className="badge bg-secondary">Segment {String.fromCharCode(65 + segmentIndex)}</span>
          </header>
          <div className="carriage-list__segment-body">
            {segment?.carriages?.map((carriage) => (
              <Carriage
                features={carriage.features}
                key={`carriage-${segmentIndex}-${carriage.number}`}
                number={carriage.number}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

CarriageList.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      carriages: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
          features: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ),
  direction: PropTypes.oneOf(['left', 'right']),
};

export default CarriageList;
