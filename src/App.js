import { useState } from 'react';

import './assets/bootstrap.css';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import TrainDisplay from './components/TrainDisplay/TrainDisplay';
import useDebounce from './hooks/useDebounce';
import useTrainSearch from './hooks/useTrainSearch';

/**
 * App composes the carriage train explorer interface.
 * It exposes a station search bar, real-time train insights, and responsive visuals.
 *
 * @returns {JSX.Element} Root application component.
 */
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { trains, loading, error, refresh } = useTrainSearch(debouncedSearchTerm);

  return (
    <div className="app">
      <main className="app__container" role="main">
        <header className="app__header">
          <h1 className="app__title">Carriage Train Monitor</h1>
          <p className="app__subtitle">
            Explore live carriage composition, accessibility features, and passenger load for Belgian rail
            services. Search by station to tailor the data set in real time.
          </p>
        </header>
        <SearchBar
          disabled={loading}
          onChange={setSearchTerm}
          onSubmit={refresh}
          value={searchTerm}
        />
        <TrainDisplay error={error} loading={loading} trains={trains} />
      </main>
    </div>
  );
};

export default App;
