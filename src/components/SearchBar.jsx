import React, {useEffect, useState} from 'react';
import './style.css';
import axios from "axios";

const SearchBar = ({setResult,setLoading}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);

        const responseMock = {
        data: [{
            time: "12:00",
            stationName: "Brussel",
            nextStops: ["Meiser", "Schuman", "Merode"],
            destination: "Antwerpen",
            trainName:"S5",
            segments: [
                {
                    carriages: [
                        {number: 1, features: ['bike', 'wheelchair']},
                        {number: 2, features: ['bike']},
                        {number: 3, features: ['wheelchair']},
                    ]
                },
                {
                    carriages: [
                        {number: 4, features: ['bike', 'wheelchair']},
                        {number: 5, features: ['bike']},
                        {number: 6, features: ['wheelchair']},
                    ]
                },                    {
                    carriages: [
                        {number: 1, features: ['bike', 'wheelchair']},
                        {number: 2, features: ['bike']},
                        {number: 3, features: ['wheelchair']},
                    ]
                },
                {
                    carriages: [
                        {number: 4, features: ['bike', 'wheelchair']},
                        {number: 5, features: ['bike']},
                        {number: 6, features: ['wheelchair']},
                    ]
                }
            ],
            direction: 'left',
            details: 'eventual details here ...'
        }]
    }


    const fetchTrainInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/traininfo/', {
                params: {
                    station_name: searchTerm
                }
            });
            setResult(responseMock.data);
            setLoading(false);
        } catch (error) {
            console.error('Error FE -> fetching data:', error);
        }

    }


    useEffect(() => {
        setLoading(true)

            if (searchTerm) {
                if (debounceTimer) {
                    clearTimeout(debounceTimer);
                }

                setDebounceTimer(setTimeout(() => {
                    fetchTrainInfo();
                    console.log('fetching data',);
                }, 3000));
            }

        setResult(responseMock.data)
        setLoading(false)
    }, [searchTerm]);

    return (
        <div className="search-bar">
            <input
                className="search-bar-input"
                type="text"
                placeholder="Search station ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;