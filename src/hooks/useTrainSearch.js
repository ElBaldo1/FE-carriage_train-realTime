import { useCallback, useEffect, useRef, useState } from 'react';

import { getTrainSchedules, subscribeToLiveUpdates } from '../utils/trainApi';

/**
 * useTrainSearch encapsulates the data-fetching and live-update logic for the train schedule view.
 *
 * @param {string} stationQuery - Current search input supplied by the user.
 * @returns {{ trains: Array, loading: boolean, error: string | null, refresh: () => void }}
 * Hook return signature including the train data, loading state, error message, and a refresh helper.
 */
const useTrainSearch = (stationQuery) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const latestQueryRef = useRef(stationQuery);

  const fetchTrains = useCallback(
    async (query, abortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getTrainSchedules(query, abortSignal);
        if (!abortSignal?.aborted) {
          setTrains(data);
        }
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError('Unable to load train information. Please try again.');
        }
      } finally {
        if (!abortSignal?.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    latestQueryRef.current = stationQuery;
    const controller = new AbortController();
    fetchTrains(stationQuery, controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchTrains, stationQuery]);

  useEffect(() => {
    const unsubscribe = subscribeToLiveUpdates((updates) => {
      setTrains((current) => {
        const normalizedQuery = latestQueryRef.current?.trim().toLowerCase();
        const filteredUpdates = normalizedQuery
          ? updates.filter((train) => train.stationName.toLowerCase().includes(normalizedQuery))
          : updates;

        if (!filteredUpdates.length) {
          return current;
        }

        const updateMap = new Map(filteredUpdates.map((train) => [train.id, train]));
        return current.map((train) => updateMap.get(train.id) ?? train);
      });
    });

    return unsubscribe;
  }, []);

  const refresh = useCallback(() => {
    fetchTrains(latestQueryRef.current);
  }, [fetchTrains]);

  return { trains, loading, error, refresh };
};

export default useTrainSearch;
