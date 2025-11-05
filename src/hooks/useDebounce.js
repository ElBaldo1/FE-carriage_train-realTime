import { useEffect, useState } from 'react';

/**
 * useDebounce delays the propagation of a value until a given timeout has elapsed.
 * This prevents excessive API calls while the user is typing.
 *
 * @param {string} value - The value to debounce.
 * @param {number} delay - Delay in milliseconds before emitting the value.
 * @returns {string} Debounced value updated after the delay expires.
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
