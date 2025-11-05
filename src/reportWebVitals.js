/**
 * reportWebVitals dynamically imports the Web Vitals library and registers performance callbacks.
 *
 * @param {(metric: import('web-vitals').Metric) => void} onPerfEntry - Callback executed for each metric.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
