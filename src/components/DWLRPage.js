import React, { useState } from 'react';
import './DWLRPage.css';
import Header from './Header1'; // Import the Header component

function DWLRPage() {
  // Sample data for zones and DWLRs
  const zones = [
    { city: 'Chennai', count: 69 },
    { city: 'Delhi', count: 52 },
    { city: 'Calcutta', count: 48 },
    { city: 'Mumbai', count: 55 },
    { city: 'Bangalore', count: 62 },
    { city: 'Hyderabad', count: 46 },
    { city: 'Bhopal', count: 44 },
    { city: 'Pune', count: 50 },
    { city: 'Kolkata', count: 42 },
    { city: 'Jaipur', count: 60 },
    // Add more cities...
  ];

  const dwlrData = {
    'Chennai': Array.from({ length: 69 }, (_, i) => ({
      id: `CH${i + 1}`,
      date: `27-09-2024 02:34:0${i % 10} pm`,
      vendor: `Vendor${i + 1}`,
      type: i % 2 === 0 ? 'Water abnormality' : 'Low battery level',
    })),
    'Delhi': Array.from({ length: 52 }, (_, i) => ({
      id: `DL${i + 1}`,
      date: `25-09-2024 12:24:0${i % 10} pm`,
      vendor: `Vendor${i + 1}`,
      type: i % 2 === 0 ? 'Abnormal data' : 'Core',
    })),
    // Add more data for each city...
  };

  const [selectedCity, setSelectedCity] = useState(null);

  // Handle zone click
  const handleZoneClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <Header /> {/* Add the Header component */}
      <div className="dwlr-container">
        <div className="zones-section">
          <div className="zones-header">
            <h3>ZONES</h3>
            <div className="icons">
              <input type="text" className="search-bar" placeholder="Search..." />
              <i className="search-icon">🔍</i>
            </div>
          </div>
          <div className="zones-list">
            <div className="zones-list-header">
              <span>Area</span>
              <span>No. of DWLRs</span>
            </div>
            {zones.map((zone, index) => (
              <div
                key={index}
                className="zone-item"
                onClick={() => handleZoneClick(zone.city)}
              >
                <span className="zone-name">{zone.city}</span>
                <span className="dwlr-count">{zone.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="zone-details-section">
          {selectedCity ? (
            <>
              <div className="zone-details-header">
                <h3>{selectedCity} DWLRs</h3>
                <div className="icons">
                  <input type="text" className="search-bar" placeholder="Search..." />
                  <i className="search-icon">🔍</i>
                </div>
              </div>
              <div className="zone-details-list">
                <div className="zone-details-list-header">
                  <span>DWLR ID</span>
                  <span>Time and Date</span>
                  <span>Vendor ID</span>
                  <span>Type</span>
                </div>
                {/* Check if dwlrData[selectedCity] exists and is an array */}
                {dwlrData[selectedCity] && dwlrData[selectedCity].length > 0 ? (
                  dwlrData[selectedCity].map((item, index) => (
                    <div key={index} className="detail-item">
                      <span className="dwlr-id">{item.id}</span>
                      <span className="time-date">{item.date}</span>
                      <span className="vendor-id">{item.vendor}</span>
                      <span className={`alert-type ${item.type.toLowerCase().replace(/ /g, '-')}`}>
                        {item.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <div>No DWLR data available for {selectedCity}</div>
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <h3>Please select a city to view DWLR details.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DWLRPage;
