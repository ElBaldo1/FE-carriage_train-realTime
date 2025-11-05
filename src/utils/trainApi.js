import mockTrains from './mockTrains';

const OCCUPANCY_STATES = ['Low', 'Moderate', 'High'];
const STATUS_STATES = ['On time', 'Boarding', 'Delayed 5 min'];
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

/**
 * Filters the mock dataset using the supplied query.
 *
 * @param {string} query - User-provided station search string.
 * @returns {Array} Filtered train results.
 */
const filterByQuery = (query) => {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return mockTrains;
  }

  return mockTrains.filter((train) => train.stationName.toLowerCase().includes(normalizedQuery));
};

/**
 * fetchLiveSchedules queries the configured backend endpoint for real train data.
 *
 * @param {string} query - Station query string.
 * @param {AbortSignal} [signal] - Optional abort signal for cancelling the request.
 * @returns {Promise<Array>} Promise resolving to live train data.
 */
const fetchLiveSchedules = async (query, signal) => {
  const response = await fetch(`${API_BASE_URL}/traininfo?station=${encodeURIComponent(query ?? '')}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error('Unable to fetch live schedules');
  }

  const payload = await response.json();
  return payload?.trains ?? [];
};

/**
 * getTrainSchedules simulates an asynchronous API request for train data when no backend is configured.
 * If a `REACT_APP_API_BASE_URL` value is supplied the function attempts to query the live endpoint first.
 *
 * @param {string} query - Station query string.
 * @param {AbortSignal} [signal] - Optional abort signal for cancelling the request.
 * @returns {Promise<Array>} Promise resolving to the filtered train list.
 */
export const getTrainSchedules = async (query, signal) => {
  if (API_BASE_URL) {
    try {
      const liveResults = await fetchLiveSchedules(query, signal);
      if (liveResults.length) {
        return liveResults;
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        console.warn('Falling back to mock schedules:', error);
      }
    }
  }

  await delay(450);

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const now = new Date().toISOString();
  return filterByQuery(query).map((train) => ({
    ...train,
    lastUpdated: now,
  }));
};

/**
 * subscribeToLiveUpdates emulates a push-based update stream for train metrics.
 *
 * @param {(updates: Array) => void} callback - Handler invoked with updated train data.
 * @returns {() => void} Cleanup function to stop the subscription.
 */
export const subscribeToLiveUpdates = (callback) => {
  const intervalId = setInterval(() => {
    const now = new Date().toISOString();
    const updates = mockTrains.map((train) => ({
      ...train,
      occupancy: randomItem(OCCUPANCY_STATES),
      status: randomItem(STATUS_STATES),
      lastUpdated: now,
    }));

    callback(updates);
  }, 10000);

  return () => {
    clearInterval(intervalId);
  };
};
