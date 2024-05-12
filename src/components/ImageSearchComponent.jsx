import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';

function ImageSearchComponent() {
    const [stationName, setStationName] = useState('');
    const [trackNumber, setTrackNumber] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [stationsImage, setStationsImage] = useState([]);
    console.log('stationsImage',stationsImage);

    // Function to fetch image from backend
    const fetchImage = async () => {
        if (stationName.trim() && trackNumber.trim()) {  // Check that both fields are not empty
            console.log('Fetching image...');
            axios.post('http://localhost:5000/generate-image', {
                stationName,
                trackNumber
            })
                .then(response => {
                    console.log("Image fetched successfully");
                    setStationsImage(response.data.image);
                })
                .catch(error => {
                    console.error('Error fetching the image:', error);
                });
        } else {
            setStationsImage(null); // Clear the image if any of the fields are empty
        }
    };

    useEffect(() => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        setDebounceTimer(setTimeout(() => {
            fetchImage();
            console.log('fetching data');
        }, 2000));

        // Clean up function to clear the timer when the component unmounts
        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [stationName, trackNumber]); // Effect runs when either stationName or trackNumber changes

    // Continue from the previous React code setup
// Previous React component setup remains the same
    return (
        <div className="container">
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Enter Station Name"
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    className="search-input"
                />
                <input
                    type="number"
                    placeholder="Enter Track Number"
                    value={trackNumber}
                    onChange={(e) => setTrackNumber(e.target.value)}
                    className="search-input"
                />
            </div>
            {stationsImage && (
                <div className="img-container">
                    <img src={`data:image/png;base64,${stationsImage}`} alt="Image loading ..."/>
                </div>
            )}
        </div>
    );

}


export default ImageSearchComponent;
