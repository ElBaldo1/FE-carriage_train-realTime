import './App.css';
import SearchBar from "./components/SearchBar";
import {useState} from "react";
import TrainDisplay from "./components/TrainDisplay";

function App() {

    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);


    return (
        <div>
            <SearchBar setResult={setStations} setLoading={setLoading}  />
            {
                stations.map((station, index) => (
                    <>
                        <h4 className="station-name">{station.stationName}</h4>
                        <h5 className="station-rail">Rail 4</h5>
                        <TrainDisplay key={index} station={station} loading={loading} />
                    </>
                ))
            }
        </div>
    );
}

export default App;