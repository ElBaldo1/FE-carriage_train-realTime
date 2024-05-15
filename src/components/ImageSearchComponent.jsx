import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function ImageSearchComponent() {
    const [stationName, setStationName] = useState('');
    const [trackNumber, setTrackNumber] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [stationsImage, setStationsImage] = useState(null); // Initialize as null

    // Function to fetch image from backend
    const fetchImage = async () => {
        if (stationName.trim() && trackNumber.trim()) {
            console.log('Fetching image...');
            setStationsImage(null); // Clear the image before fetching new one
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
                setStationsImage(null); // Ensure image state is cleared on error
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
            console.log('Fetching data due to input change');
        }, 2000));

        // Clean up function to clear the timer when the component unmounts
        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [stationName, trackNumber]); // Effect runs when either stationName or trackNumber changes

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
                    <img src={`data:image/png;base64,${stationsImage}`} alt="Station Image" />
                </div>
            )}
        </div>
    );
}

export default ImageSearchComponent;
