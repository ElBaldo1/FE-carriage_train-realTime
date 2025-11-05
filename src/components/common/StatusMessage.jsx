import PropTypes from 'prop-types';
import './StatusMessage.css';

const VARIANT_CLASSNAMES = {
  info: 'alert-info',
  danger: 'alert-danger',
  success: 'alert-success',
  secondary: 'alert-secondary',
};

/**
 * StatusMessage provides a reusable, accessible alert element for communicating feedback.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.message - Message to display to the user.
 * @param {'info'|'danger'|'success'|'secondary'} props.tone - Visual tone for the alert.
 * @param {string} props.role - ARIA role used to communicate the message semantics.
 * @returns {JSX.Element} The rendered alert component.
 */
const StatusMessage = ({ message, tone = 'info', role = 'status' }) => (
  <div aria-live="polite" className={`alert ${VARIANT_CLASSNAMES[tone]}`} role={role}>
    {message}
  </div>
);

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  tone: PropTypes.oneOf(['info', 'danger', 'success', 'secondary']),
  role: PropTypes.string,
};

export default StatusMessage;
