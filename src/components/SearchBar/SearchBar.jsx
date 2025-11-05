import PropTypes from 'prop-types';
import { useCallback } from 'react';
import './SearchBar.css';

/**
 * SearchBar renders the station search form used to filter the train schedule.
 * The component is keyboard accessible and exposes callbacks for change and submit events.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.value - The current value of the search field.
 * @param {(value: string) => void} props.onChange - Handler invoked when the input value changes.
 * @param {() => void} props.onSubmit - Handler invoked when the form is submitted.
 * @param {boolean} props.disabled - Indicates whether the input should be disabled.
 * @param {string} [props.placeholder] - Optional placeholder text for the input element.
 * @returns {JSX.Element} The rendered search bar.
 */
const SearchBar = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Search by station name',
}) => {
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!disabled) {
        onSubmit();
      }
    },
    [disabled, onSubmit]
  );

  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <form aria-label="Train station search" className="search-bar" onSubmit={handleSubmit} role="search">
      <label className="search-bar__label" htmlFor="station-search-input">
        Station
      </label>
      <div className="search-bar__controls">
        <input
          aria-describedby="station-search-help"
          aria-label="Search for a train station"
          autoComplete="off"
          className="form-control search-bar__input"
          disabled={disabled}
          id="station-search-input"
          onChange={handleChange}
          placeholder={placeholder}
          type="search"
          value={value}
        />
        <button className="btn btn-primary search-bar__button" disabled={disabled} type="submit">
          Search
        </button>
      </div>
      <p className="visually-hidden" id="station-search-help">
        Type a station name to view the latest train composition and details.
      </p>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SearchBar;
