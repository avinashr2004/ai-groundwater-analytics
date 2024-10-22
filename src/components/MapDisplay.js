import React from 'react';
import './MapDisplay.css';

const MapDisplay = ({ title }) => {
    return (
        <div className="map-display">
            <h2>{title}</h2>
            <div className="map-placeholder">
                <p>Map Placeholder</p>
            </div>
        </div>
    );
};

export default MapDisplay;
